<template>
  <carousel 
    :per-page='1' 
    class='create-question-modal default-modal' 
    :paginationEnabled='false' 
    :adjustableHeight='true'
    :navigateTo='currentSlide'
  >
    <!-- === QUESTION === -->
    <slide data-index='0'>
      <h3 class='heading h--xxm h--color-primary'>What is your question?</h3>
      <input type='text' class='default-input' placeholder='Question' v-model='question'>
      <submit-and-cancel @onsubmit='nextSlide' @oncancel='$store.dispatch("Modals/closeModals")'/>
    </slide>
    <!-- ========== -->

    <!-- === ADD ASSETS === -->
    <slide data-index='0'>
      <h3 class='heading h--xxm h--color-primary'>Add image and/or audio?</h3>

      <div class='image-container'>
        <img v-if='selectedImgURL !== undefined' :src='selectedImgURL' alt='img'>

        <div class='icons flex justify-center align-end'>
          <input 
            type='file' 
            ref='img' 
            style='display: none' 
            @change='onImgSelect'
          >

          <input 
            type='file'
            ref='audio'
            style='display: none'
            @change='onAudioSelect'
          >

          <div :class='`icon flex-center ${ selectedImgURL !== undefined && "active" }`' @click='$refs.img.click()'>
            <gallery/>
          </div>

          <div :class='`icon flex-center ${ selectedAudioURL !== undefined && "active" }`' @click='$refs.audio.click()'>
            <volume />
          </div>
        </div>
      </div>

      <pre id='json'></pre>

      <audio v-if='selectedAudioURL !== undefined' controls>
        <source :src='selectedAudioURL'>
      </audio>

      <submit-and-cancel @onsubmit='nextSlide' @oncancel='$store.dispatch("Modals/closeModals")'/>
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
            <input v-model='answer.answer' type='text' class='default-input' :placeholder='`Answer ${ i + 1 }`'>
          </div>
          <!-- ========== -->

          <h2 class='heading h--m h--align-center h--color-primary' @click='addAnswer' v-if='answers.length < 4'>Add answer</h2>
        </div>

        <submit-and-cancel @onsubmit='onAnswerFillSubmit' @oncancel='$store.dispatch("Modals/closeModals")'/>
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

export default {
  name: 'CreateQuestionModal',
  components: { Gallery, Volume, CheckMark, SubmitAndCancel, Carousel, Slide },
  data: () => ({
    Sample,
    question: '',
    answers: [],
    selectedCorrectAnswer: false,
    currentSlide: 0,
    selectedImgURL: undefined,
    selectedAudioURL: undefined,
    answersFilled: false
  }),
  created () {
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
    nextSlide () {
      this.currentSlide += 1;
    },

    onImgSelect (e) {
      if (e.target.files[0] && e.target.files[0].type.includes('image')) {
        this.selectedImgURL = URL.createObjectURL(e.target.files[0]);
        console.log('img', this.selectedImgURL);
      }
    },

    onAudioSelect (e) {
      

      if (e.target.files[0]) {
        document.getElementById('json').innerHTML = JSON.stringify(e.target.files[0]);
        this.selectedAudioURL = URL.createObjectURL(e.target.files[0]);
        console.log('audio', this.selectedAudioURL);
      }
    },

    addAnswer () {
      if (this.answers.length < 4) {
        this.answers.push({
          id: this.answers.length,
          answer: '',
          correct: false,
          type: 'text'
        });
      }
    },

    onAnswerFillSubmit () {
      if (this.answersFilled && this.selectedCorrectAnswer) {
        this.onFormSubmit();
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

    onFormSubmit () {
      this.$store.dispatch('CreateQuiz/onQuestionFormSubmit', {
        question: this.question,
        answers: this.answers,
        imgUrl: this.selectedImgURL,
        audioUrl: this.selectedAudioURL
      });

      this.$store.dispatch('Modals/closeModals');
    }
  },
  computed: {
    
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
</style>
