<template>
  <div class='create-question'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>

      <!-- Make question. -->
      <div key='1' v-if='selectedSlide === 0'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>What is your question?</h3>
          <input class='default-input' type='text' placeholder='Question' v-model='formData.question'>
          <p class='paragraph p--s p--color-danger p--weight-bold'>{{ error }}</p>
        </section>

        <section>
          <media-uploader 
            :img='true' 
            :audio='true' 
            :formData='formData' 
            :type='"question"'
            @onImgUpload='setImage'
            @onAudioUpload='setAudio'
          />
        </section>

        <submit-and-cancel :includeBack='false' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='nextSlide("question-1-2")'/>
      </div>

      <!-- Add answers. -->
      <div key='2' v-if='selectedSlide === 1'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>{{ !answersFilled ? 'Add your answers' : 'Which one is correct?' }}</h3>

          <div v-for='answer in formData.answers' :key='answer.id' class='answer flex-center'>
            <check-mark v-if='checkIfCheckHasToRender()' @click.native='setAnswerCorrect(answer.id)' :checked='answer.correct'/>
            <input 
              @keydown='onInputKeyDown' 
              class='default-input' 
              v-model='answer.answer' 
              type='text' 
              :placeholder='`Answer ${ answer.id + 1 }`'
              :disabled='answersFilled'
            >
          </div>

          <p style='margin-top: -1rem;' class='paragraph p--s p--color-danger p--weight-bold'>{{ error }}</p>

          <h2 
            v-if='formData.answers.length < 4 && !answersFilled'
            class='add-answer heading h--m h--align-center h--color-primary' 
            :class='formData.answers[formData.answers.length - 1].answer === "" && "disabled"'
            @click='addAnswer'
          >
            Add answer
          </h2>
        </section>

        <submit-and-cancel 
          :includeBack='true' 
          @onback='answersFilled ? (answersFilled = false, selectedCorrectAnswer = false) : prevSlide' 
          @oncancel='$store.dispatch("Modals/closeModal")'
          @onsubmit='checkAnswersSubmit'
        />
      </div>

    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import clonedeep from 'lodash.clonedeep';
import ModalMixins from '@/mixins/ModalMixins';
import DefaultButton from '@/components/buttons/DefaultButton';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';
import MediaUploader from '@/components/media/MediaUploader';

export default {
  /* === ModalMixins.js ===
  - selectedSlide (data)
  - nextSlide (method)
  - prevSlide (method)
  ========== */

  name: 'CreateQuestion',
  mixins: [ModalMixins],
  components: { DefaultButton, CheckMark, SubmitAndCancel, MediaUploader },
  data: () => ({
    formData: {
      question: '',
      questionImg: '',
      questionAudio: '',
      answers: [{
        id: 0,
        answer: '',
        correct: false,
        type: 'text'
      }]
    },
    answersFilled: false,
    selectedCorrectAnswer: false,
  }),
  computed: {
    ...mapState('CreateQuiz', ['quiz', 'questionId'])
  },
  created () {
    if (this.questionId !== undefined) {
      this.formData = clonedeep(this.quiz.questions[this.questionId]);
    }
  },
  beforeDestroy () {
    this.$store.dispatch('CreateQuiz/onCreateQuestionModalDestory');
  },
  methods: {
    // When a image is selected.
    setImage (output) {
      this.formData.questionImg = output;
    },

    // When audio is selected.
    setAudio (output) {
      this.formData.questionAudio = output;
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

      const tabBtn = 9;
      const enterBtn = 13
      const returnBtn = 8;

      // Return key is pressed.
      if (e.keyCode === returnBtn && (lastAnswer === '' && firstAnswer)) {
        this.formData.answers.pop();
      } 
      
      if (e.keyCode === tabBtn || e.keyCode === enterBtn) {
        this.addAnswer();
      } 
      
      if (e.keyCode === enterBtn && this.formData.answers.length > 3) {
        this.checkAnswersSubmit();
      }
    },

    checkIfCheckHasToRender () {
      if (this.answersFilled) {
        this.formData.answers.forEach(answer => {
          if (answer.correct) {
            this.selectedCorrectAnswer = true;
          }
        })

        return true;
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

        if (this.checkDuplicateValues()) {
          this.error = 'Make sure you use unique values!';
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

    checkDuplicateValues () {
      let answers = this.formData.answers.map(answer => answer.answer.toLowerCase());
      let arr = [...new Set(answers)];

      if (answers.length !== arr.length) {
        return true;
      }

      if (answers.length === arr.length) {
        return false;
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
      if (this.questionId !== undefined) {
        this.$store.dispatch('CreateQuiz/onQuestionEdit', { question: this.formData });
      }

      if (this.questionId === undefined) {
        this.$store.dispatch('CreateQuiz/onQuestionCreate', { question: this.formData });
      }
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