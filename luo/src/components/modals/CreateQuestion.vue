<template>
  <div class='create-question'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>

      <!-- === SELECT QUESTION === -->
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

          <img v-if='formData.questionImg !== ""' :src='formData.questionImg' :alt='"Uploaded file."' @click='$refs.img.click()'>
          <default-button v-if='formData.questionImg === ""' :content='"Add question image"' @click.native='$refs.img.click()'/>
        </section>

        <submit-and-cancel :includeBack='false' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='nextSlide("question-1-2")'/>
      </div>
      <!-- ========== -->

      <!-- === ADD ANSWERS === -->
      <div key='2' v-if='selectedSlide === 1'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>{{ !answersFilled ? 'Add your answers' : 'Which one is correct?' }}</h3>

          <div v-for='answer in formData.answers' :key='answer.id' class='answer flex-center'>
            <check-mark v-if='answersFilled' @click.native='setAnswerCorrect(answer.id)' :checked='answer.correct'/>
            <input @keydown='deleteAnswerField' class='default-input' v-model='answer.answer' type='text' :placeholder='`Answer ${ answer.id + 1 }`'>
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
      <!-- ========== -->

    </transition>
  </div>
</template>

<script>
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
  methods: {
    /* === IMAGES === */
    setImage (output) {
      this.formData.questionImg = output;
    },

    startImageResize () {
      // FOR LOADING
    },

    endImageResize () {
      // FOR LOADING
    },
    /* ========== */

    /* === ANSWERS === */
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

    deleteAnswerField (e) {
      if (e.keyCode === 8 && (this.formData.answers[this.formData.answers.length - 1].answer === '' && this.formData.answers[0].answer !== '')) {
        console.log('BACKSPACE!!');
        this.formData.answers.pop();
      }
    },

    checkAnswersSubmit () {
      // SWITCH TO SELECT CORRECT MODE
      if (!this.selectedCorrectAnswer) {
        let collected = this.formData.answers.filter(answer => answer.answer.trim() === '');

        if (collected.length > 0) {
          this.error = 'Make sure you filled in every answer.';
          return;
        }

        this.error = '';
        this.answersFilled = true;
      }

      // SUBMIT AFTER SELECTING A CORRECT ANSWER
      if (this.selectedCorrectAnswer) {
        this.onFormSubmit();
      }
    },

    setAnswerCorrect (i) {
      this.formData.answers.map(answer => answer.correct = false);
      this.formData.answers[i].correct = true;
      this.selectedCorrectAnswer = true;
    },
    /* ========== */

    /* === ON FORM SUBMIT === */
    onFormSubmit () {
      console.log('FORM DATA', this.formData);

      this.$store.dispatch('CreateQuiz/onQuestionFormSubmit', this.formData).then(() => {
        this.$store.dispatch('Modals/closeModal');
      });
    }
    /* ========== */
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