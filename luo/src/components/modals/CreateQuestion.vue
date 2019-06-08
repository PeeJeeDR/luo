<template>
  <div class='create-question'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>

      <!-- Make question. -->
      <div key='1' v-if='selectedSlide === 0'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>What is your question?</h3>
          <input class='default-input' type='text' placeholder='Question' v-model='formData.question'>
          <p class='paragraph p--s p--color-danger p--weight-bold error'>{{ error }}</p>
        </section>

        <section>
          <image-uploader
            style='display: none'
            :debug='1'
            :maxWidth='512'
            :quality='0.7'
            :autoRotate='true'
            outputFormat='string'
            :preview='true'
            capture='environment'
            accept='image/*'
            doNotResize='["gif", "svg"]'
            @input='setImage'
            @onUpload='startImageResize'
            @onComplete='endImageResize'
          >
            <label for='fileInput' ref='img' slot='upload-label'></label>
          </image-uploader>

          <p>{{ formData }}</p>

          <img v-if='formData.questionImg !== ""' :src='formData.questionImg' alt='Uploaded file.' @click='$refs.img.click()'>
          <default-button v-if='formData.questionImg === ""' :content='"Add question image"' @click.native='$refs.img.click()'/>
        </section>

        <submit-and-cancel :includeBack='false' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='nextSlide("question-1-2")'/>
      </div>

      <!-- Add answers. -->
      <div key='2' v-if='selectedSlide === 1'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>{{ !answersFilled ? 'Add your answers' : 'Which one is correct?' }}</h3>

          <div v-for='answer in formData.answers' :key='answer.id' class='answer flex-center'>
            <check-mark v-if='answersFilled' @click.native='setAnswerCorrect(answer.id)' :checked='answer.correct'/>
            <input 
              @keydown='onInputKeyDown' 
              class='default-input' 
              v-model='answer.answer' 
              type='text' 
              :placeholder='`Answer ${ answer.id + 1 }`'
            >
          </div>

          <p style='margin-top: -1rem;' class='paragraph p--s p--color-danger p--weight-bold error'>{{ error }}</p>

          <h2 
            v-if='formData.answers.length < 4'
            class='add-answer heading h--m h--align-center h--color-primary' 
            :class='formData.answers[formData.answers.length - 1].answer === "" && "disabled"'
            @click='addAnswer'
          >
            Add answer
          </h2>
        </section>

        <submit-and-cancel :includeBack='true' @onback='prevSlide' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='checkAnswersSubmit'/>
      </div>

    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ModalMixins from '@/mixins/ModalMixins';
import DefaultButton from '@/components/buttons/DefaultButton';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  /* === ModalMixins.js ===
  - selectedSlide (data)
  - nextSlide (method)
  - prevSlide (method)
  ========== */

  name: 'CreateQuestion',
  mixins: [ModalMixins],
  components: { DefaultButton, CheckMark, SubmitAndCancel },
  data: () => ({
    formData: {
      question: '',
      questionImg: '',
      answers: [{
        id: 0,
        answer: '',
        correct: false,
        type: 'text'
      }]
    },
    answersFilled: false,
    selectedCorrectAnswer: false
  }),
  computed: {
    ...mapState('CreateQuiz', ['questions', 'editMode', 'quizToBeEdited', 'selectedQuestion', 'isNewQuestion']),
  },
  created () {
    console.log('QUIZ TO BE EDITED', this.quizToBeEdited);
    if (this.editMode && !this.isNewQuestion && this.quizToBeEdited !== undefined) {
      const currentQuestion = this.quizToBeEdited.questions[this.selectedQuestion.id];

      this.formData = currentQuestion;
      this.answersFilled = true;
      this.selectedCorrectAnswer = true;
    }

    if (this.editMode && this.isNewQuestion && this.quizToBeEdited === undefined) {
      console.log('Hello');
      console.log('selected question', this.selectedQuestion);
      const currentQuestion = { ...this.selectedQuestion };
      this.formData = currentQuestion;
      this.answersFilled = true;
      this.selectedCorrectAnswer = true;
    }
  },
  methods: {
    // When a image is selected.
    setImage (output) {
      this.formData.questionImg = output;
    },

    // On start of image resize.
    startImageResize () {
      // FOR LOADING
    },

    // On end of image resize.
    endImageResize () {
      // FOR LOADING
    },

    // When user adds an answer, a input field has to be added.
    addAnswer () {
      if (this.formData.answers.length > 0 && this.formData.answers.length < 4) {
        if (this.formData.answers[this.formData.answers.length - 1].answer.trim() === '') { 
          this.error = 'Make sure you filled in the previous answer.'
          return
        }

        this.error = '';
        this.formData.answers.push({
          id: this.formData.answers.length,
          answer: '',
          correct: false,
          type: 'text'
        });
      }
    },

    // Delete answer field.
    onInputKeyDown (e) {
      const firstAnswer = this.formData.answers[0].answer !== '';
      const lastAnswer = this.formData.answers[this.formData.answers.length - 1].answer;

      if (e.keyCode === 8 && (lastAnswer === '' && firstAnswer)) {
        this.formData.answers.pop();
      }

      if (e.keyCode === 9) {
        this.addAnswer();
      }
    },

    // When submitted on add answers screen.
    // We need to check if all answers are correctly filled.
    checkAnswersSubmit () {
      // Switch to select correct answer screen.
      if (!this.selectedCorrectAnswer) {
        let emptyAnswers = this.formData.answers.filter(answer => answer.answer.trim() === '');
        let filledAnswers = this.formData.answers.filter(answer => answer.answer.trim() !== '');

        if (emptyAnswers.length > 0) {
          this.error = 'Make sure you filled in every answer.';
          return;
        }

        if (filledAnswers.length < 2) {
          this.error = 'Make sure you add at least 2 questions.';
          return;
        }

        this.error = '';
        this.answersFilled = true;
      }

      // Submit after selecting a correct answer.
      if (this.selectedCorrectAnswer) {
        this.onFormSubmit();
      }
    },

    // When selecting a correct answer.
    setAnswerCorrect (i) {
      this.formData.answers.map(answer => answer.correct = false);
      this.formData.answers[i].correct = true;
      this.selectedCorrectAnswer = true;
    },

    // When submitting the form.
    onFormSubmit () {
      if (this.editMode && this.isNewQuestion) {
        this.formData.id = this.quizToBeEdited.questions.length;
      }

      if (this.editMode && !this.isNewQuestion) {
        this.formData.id = this.selectedQuestion.id;
      }

      if (!this.editMode) {
        this.formData.id = this.questions.length;
      }
      
      this.$store.dispatch('CreateQuiz/onQuestionFormSubmit', this.formData);
    }
  }
}
</script>

<style lang='scss' scoped>
.create-question
{
  .answer {
    margin-bottom: 1rem;

    input {
      margin: 0;
    }
  }

  .add-answer {
    margin-top: 2rem;

    &.disabled {
      color: $mist;
    }
  }
}
</style>