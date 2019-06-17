<template>
  <div class='create-question'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>

      <div key='1' v-if='selectedSlide === 0'>
        <!-- Question. -->
        <section>
          <h3 class='title heading h--xm h--color-primary'>What is your question?</h3>
          <input class='default-input' type='text' placeholder='Question' v-model='formData.question'>

          <p class='error paragraph p--m p--color-danger p--weight-bold p--align-center'>{{ errors.questionError }}</p>
        </section>

        <!-- Media. -->
        <section>
          <h3 class='title heading h--xm h--color-primary'>Add media (optional)</h3>
          <media-uploader 
            :img='true' 
            :audio='true' 
            :formData='formData' 
            :type='"question"'
            @onImgUpload='setImage'
            @onAudioUpload='setAudio'
          />
        </section>

        <!-- Answers. -->
        <section class='answers'>
          <div class='flex align-center justify-between'>
            <h3 class='heading h--xm h--color-primary'>Answers</h3>
            <h3 class='heading h--xm h--color-primary'>Correct</h3>
          </div>  

          <div v-for='(answer, i) in formData.answers' class='single-answer flex align-center justify-between'>
            <input v-model='answer.answer' class='default-input' type='text' :placeholder='`Answer ${ i + 1 }`'>
            <check-mark 
              v-if='answer.answer.trim() !== "" || formData.answers.indexOf(answer) === 0 || formData.answers.indexOf(answer) === 1' 
              :checked='answer.correct' 
              @click.native='setCorrectAnswer(i)'
            />
          </div>

          <p class='error paragraph p--m p--color-danger p--weight-bold p--align-center'>{{ errors.answersError }}</p>

          <h2 v-if='formData.answers.length < 4' class='add-answer heading h--xm h--align-center h--color-primary' @click='addAnswer'>
            Add answer
          </h2>
        </section>

        <!-- Submit. -->
        <default-button class='save' :content='"Save quiz"' @click.native='saveQuestion'/>
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
    errors: {
      questionError: '',
      mediaError: '',
      answersError: ''
    },
    answersFilled: false,
    selectedCorrectAnswer: false
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
    setImage (output) {
      this.formData.questionImg = output;
    },

    setAudio (output) {
      this.formData.questionAudio = output;
    },

    addAnswer () {
      let _this = this;

      // Functions.
      function isPreviousNotEmpty () {
        return _this.formData.answers[_this.formData.answers.length - 1].answer.trim() !== '';
      }
      function isValidNumberOfAnswers () {
        return _this.formData.answers.length > 0 && _this.formData.answers.length < 4;
      }

      // Errors.
      if (!isPreviousNotEmpty()) {
        this.errors.answersError = 'Please fill in the previous answer.';
      }

      // Push new empty answer.
      if (isPreviousNotEmpty() && isValidNumberOfAnswers()) {
        this.errors.answersError = '';

        this.formData.answers.push({
          id: this.formData.answers.length,
          answer: '',
          correct: false,
          type: 'text'
        })
      }
    },

    setCorrectAnswer (i) {
      this.formData.answers.map(answer => answer.correct = false);

      if (this.formData.answers[i].answer.trim() === '') {
        this.errors.answersError = 'Make sure to fill in the question first.';
        return;
      }

      this.errors.answersError = '';
      this.formData.answers[i].correct = true;
    },

    saveQuestion () {
      let _this = this;

      // Functions.
      function checkQuestionFilled () {
        const questionLength = _this.formData.question.trim().length;

        console.log('QUESRION LENFRG', questionLength);
        
        if (questionLength < 6) {
          _this.errors.questionError = 'Make sure the question is at least 5 characters long.';
          return false;
        }

        _this.errors.questionError = '';
        return true;
      }

      function selectedCorrectAnswer () {
        const correctAnswers = _this.formData.answers.filter(answer => answer.correct).length;

        if (correctAnswers === 0) {
          _this.errors.answersError = 'Select a correct answer.';
          return false;
        }

        _this.errors.answersError = '';
        return true;
      }

      function checkIfMinAnswersCreated () {
        const answersLength = _this.formData.answers.length;

        if (answersLength < 2) {
          _this.errors.answersError = 'Make sure to create at least 2 answers.';
          return false;
        }

        _this.errors.answersError = '';
        return true;
      }

      function removeEmptyAnswers () {
        const answersLength = _this.formData.answers.length;

        if (_this.formData.answers[answersLength - 1].answer.trim() === '' && answersLength !== 1) {
          _this.formData.answers.pop();
        }
      }

      // Execute functions.
      removeEmptyAnswers();

      // Save question.
      if (checkQuestionFilled() && checkIfMinAnswersCreated() && selectedCorrectAnswer()) {
        if (this.questionId !== undefined) {
          this.$store.dispatch('CreateQuiz/onQuestionEdit', { question: this.formData });
        }

        if (this.questionId === undefined) {
          this.$store.dispatch('CreateQuiz/onQuestionCreate', { question: this.formData });
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.create-question
{
  .error {
    margin-top: 1rem;
  }

  section.answers {
    .single-answer {
      margin-top: 1rem;

      .default-input {
        margin-top: 0rem;
        width: 100%;
      }
    }

    .check-mark {
      margin: 0 0 0 1rem;
    }

    .add-answer {
      margin-top: 1.5rem;
    }
  }

  .save {
    margin: 5rem auto 0 auto;

    @include phone {
      width: 100%;
    }
  }
}
</style>