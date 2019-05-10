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
    <slide>
      <h3 class='heading h--xxm h--color-primary'>Add image and/or audio?</h3>

      <div class='image-container'>
        <div class='icons flex justify-between'>
          <input 
            type='file' 
            ref='img' 
            style='display: none' 
            @change='(e) => { $store.dispatch("Storage/uploadFile", { file: e.target.files[0] }) }'>

          <gallery @click='$refs.img.click()'/>
          <volume />
        </div>
      </div>

      <submit-and-cancel @onsubmit='nextSlide' @oncancel='$store.dispatch("Modals/closeModals")'/>
    </slide>
    <!-- ========== -->

    <slide data-index='1'>
      <h3 class='heading h--xxm h--color-primary'>Question 1</h3>
      <form @submit.prevent='onFormSubmit'>
        <input type='text' class='default-input' placeholder='Question'  v-model='question'>

        <div class='answers' @keydown.tab='addAnswer'>
          <!-- === SINGLE ANSWER === -->
          <div class='answer flex align-center' v-for='(answer, i) in answers' :key='i'>
            <check-mark @click.native='setCorrect(i)' :checked='answer.correct'/>
            <input v-model='answer.answer' type='text' class='default-input' :placeholder='`Answer ${ i }`'>
          </div>
          <!-- ========== -->

          <h2 class='heading h--m h--align-center h--color-primary' @click='addAnswer' v-if='answers.length < 4'>Add answer</h2>
        </div>

        <submit-and-cancel @oncancel='$store.dispatch("Modals/closeModals")'/>
      </form>
    </slide>
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
    nbrOfAnswers: 1,
    selectedAnswer: 0,
    question: '',
    answers: [],
    imgSelected: false,
    currentSlide: 0,
    selectedImg: undefined,
  }),
  beforeDestroy () {
    this.$store.dispatch('Modals/closeModals');
  },
  methods: {
    nextSlide () {
      this.currentSlide += 1;
    },

    addAnswer () {
      this.answers.push({
        id: this.answers.length,
        answer: '',
        correct: false,
        type: 'text'
      });
    },

    setCorrect (i) {
      this.answers.map(answer => answer.correct = false);
      this.answers[i].correct = true;
    },

    onFormSubmit () {
      this.$store.dispatch('CreateQuiz/onQuestionFormSubmit', {
        question: this.question,
        answers: this.answers
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
  padding: 1rem 0;
  width: 100%;

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
