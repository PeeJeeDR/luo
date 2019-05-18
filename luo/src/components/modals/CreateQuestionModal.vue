<template>
  <carousel 
    :per-page='1' 
    class='create-question-modal default-modal' 
    :paginationEnabled='false' 
    :adjustableHeight='true'
    :navigateTo='currentSlide'
    @page-change='slideChanged'
  >
    <!-- === QUESTION === -->
    <slide data-index='0'>
      <h3 class='heading h--xxm h--color-primary'>What is your question?</h3>
      <input type='text' class='default-input' placeholder='Question' v-model='question'>
      <p class='paragraph p--s p--color-danger p--weight-bold error'>{{ error }}</p>
      <submit-and-cancel @onsubmit='nextSlide' @oncancel='$store.dispatch("Modals/closeModals")'/>
    </slide>
    <!-- ========== -->

    <!-- === ADD ASSETS === -->
    <slide data-index='1'>
      <h3 class='heading h--xxm h--color-primary'>Add image and/or audio?</h3>

      <div class='image-container'>
        <img v-if='selectedImgURL !== ""' :src='selectedImgURL' alt='img'>

        <div class='icons flex justify-center align-end'>
          <input type='file' ref='img' style='display: none' @change='onImgSelect'>
          <input type='file' ref='audio' style='display: none' @change='onAudioSelect'>

          <div :class='`icon flex-center ${ selectedImgURL !== "" && "active" }`' @click='$refs.img.click()'>
            <gallery/>
          </div>

          <div :class='`icon flex-center ${ selectedAudioURL !== "" && "active" }`' @click='$refs.audio.click()'>
            <volume />
          </div>
        </div>
      </div>

      <audio v-if='selectedAudioURL !== ""' controls>
        <source :src='selectedAudioURL'>
      </audio>

      <div class='flex align-center justify-between'>
        <div class='back flex-center' @click='prevSlide' v-ripple>
          <back />
        </div>
        
        <submit-and-cancel @onsubmit='nextSlide' @oncancel='$store.dispatch("Modals/closeModals")'/>
      </div>
    </slide>
    <!-- ========== -->

    <!-- === ANSWERS === -->
    <slide data-index='2'>
      <h3 class='heading h--xxm h--color-primary'>{{ answersFilled ? "Which one is correct?" : "Add your answers" }}</h3>

      <form @submit.prevent>
        <div class='answers' @keydown.tab='addAnswer'>

          <!-- === SINGLE ANSWER === -->
          <div class='answer flex align-center' v-for='(answer, i) in answers' :key='i'>
            <check-mark v-if='answersFilled' @click.native='setCorrect(i)' :checked='answer.correct'/>
            <input autofocus @keydown='deleteAnswerField' v-model='answer.answer' type='text' class='default-input' :placeholder='`Answer ${ i + 1 }`'>
          </div>
          <!-- ========== -->

          <h2 class='heading h--m h--align-center h--color-primary' @click='addAnswer' v-if='answers.length < 4'>Add answer</h2>
        </div>

        <div class='flex align-center justify-between'>
          <div class='back flex-center' @click='prevSlide' v-ripple>
            <back />
          </div>
          
          <submit-and-cancel @onsubmit='onAnswerFillSubmit' @oncancel='$store.dispatch("Modals/closeModals")'/>
        </div>
      </form>
    </slide>
    <!-- ========== -->
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Gallery from '@/assets/icons/quizzes/Gallery.svg';
import Volume from '@/assets/icons/quizzes/Volume.svg';
import Sample from '@/assets/img/sample.jpg';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';
import Back from '@/assets/icons/main-header/Back.svg';

export default {
  name: 'CreateQuestionModal',
  components: { Gallery, Volume, CheckMark, SubmitAndCancel, Carousel, Slide, Back },
  data: () => ({
    Sample,
    question: '',
    answers: [],
    selectedCorrectAnswer: false,
    currentSlide: 0,
    selectedImgURL: '',
    selectedAudioURL: '',
    answersFilled: false,
    error: '',
  }),
  created () {
    this.currentSlide = 0;

    this.answers.push({
      id: this.answers.length,
      answer: '',
      correct: false,
      type: 'text'
    });
  },
  beforeDestroy () {
    this.$store.dispatch('Modals/closeModals');
  },
  methods: {
    /* === SLIDE METHODS === */
    slideChanged (slide) {
      this.currentSlide = slide;
    },

    prevSlide () {
      this.currentSlide = this.currentSlide - 1;
    },

    nextSlide () {
      this.currentSlide += 1;
    },
    /* ========== */

    /* === FILE UPLOAD === */
    onImgSelect (e) {
      if (e.target.files[0] && e.target.files[0].type.includes('image')) {
        this.selectedImgURL = URL.createObjectURL(e.target.files[0]);
      }
    },

    onAudioSelect (e) {
      if (e.target.files[0] && !e.target.files[0].type.includes('image')) {
        this.selectedAudioURL = URL.createObjectURL(e.target.files[0]);
      }
    },
    /* ========== */

    /* === ANSWERS BOX === */
    addAnswer () {
      if (this.answers.length > 0 && this.answers[this.answers.length - 1].answer !== '' && this.answers.length < 4) {
        this.answers.push({
          id: this.answers.length,
          answer: '',
          correct: false,
          type: 'text'
        });
      }
    },

    deleteAnswerField (e) {
      if (e.keyCode === 8 && (this.answers[this.answers.length - 1].answer === '' && this.answers[0].answer !== '')) {
        console.log('BACKSPACE!!');
        this.answers.pop();
      }
    },

    onAnswerFillSubmit () {
      if (this.answersFilled && this.selectedCorrectAnswer) {
        this.onFormSubmit();
      }

      if (this.answersFilled && !this.selectedCorrectAnswer) {
        console.log('no correct selected');
      }

      if (!this.answersFilled) {
        this.answersFilled = true;
      }
    },

    setCorrect (i) {
      this.answers.map(answer => answer.correct = false);
      this.answers[i].correct = true;
      this.selectedCorrectAnswer = true;
    },
    /* ========== */

    /* === FORM SUBMIT === */
    onFormSubmit () {
      if (this.question !== '') {
        this.$store.dispatch('CreateQuiz/onQuestionFormSubmit', {
          question: this.question,
          answers: this.answers,
          imgUrl: this.selectedImgURL,
          audioUrl: this.selectedAudioURL
        });

        this.$store.dispatch('Modals/closeModals');
      }

      if (this.question === '') {
        this.currentSlide = 0;
        this.error = "Please fill in you're question."
      }
    }
    /* ========== */
  }
}
</script>

<style lang='scss' scoped>
.create-question-modal .answers {
  width: 100%;
  overflow: scroll;

  .answer {
    margin-bottom: 1rem;

    &:last-child {
      margin: 0;
    }

    input {
      margin: 0;
    }
  }
}

.back {
  height: auto;
  margin-top: 3rem;
  padding: 1rem;
  border-radius: 20rem;

  svg {
    width: 1rem;
    fill: $pinky;
  }
}
</style>
