<template>
  <div class='create-quiz align-center'>
    <div class='big-wrapper'>
      <!-- Create icon when there are no questions made. -->
      <create v-if='quiz.questions === undefined || quiz.questions.length === 0'/>

      <!-- Made questions. -->
      <div v-for='(question, i) in quiz.questions' :key='i'>
        <question :question='question' :number='i'/>
      </div>

      <!-- Create question button. -->
      <default-button :content='"Create question"' @click.native='onQuestionCreate'/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Create from '@/assets/icons/quizzes/Create.svg';
import DefaultButton from '@/components/buttons/DefaultButton';
import Question from '@/components/quizzes/Question';

export default {
  name: 'CreateQuiz',
  components: { Create, DefaultButton, Question },
  computed: {
    ...mapState('Modals', ['modalIsOpen', 'confirmAnswer']),
    ...mapState('CreateQuiz', ['quiz', 'quizModified'])
  },
  created () {
    this.$store.dispatch('CreateQuiz/onCreateQuizPageLoad');

    // Set header content.
    this.$store.dispatch('Header/onPageLoad', { 
      title: this.isQRQuiz ? 'Create QR code quiz' : 'Create quiz',
      leftIcon: 'back',
      rightIcon: 'save'
    });
  },
  beforeRouteLeave (to, from, next) {
    if (this.quizModified) {
      if (this.confirmAnswer === undefined) {
        this.$store.dispatch('Modals/openModal', { type: 'confirm' });
      } 
      
      if (this.confirmAnswer === 'leave') {
        next();
      }
    }

    if (!this.quizModified) {
      next();
    }   
  },
  methods: {
    onQuestionCreate () {
      this.$store.dispatch('CreateQuiz/onNewQuestionButtonClick');
    }
  },
  watch: {
    quiz () {
      console.log('QUIZ UPDATED', this.quiz);
    }
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {
  position: relative;
  height: 100%;
  overflow: scroll;
  padding: 4.5rem 0 7rem 0;

  .default-button {
    margin: 0 auto;
    width: 15rem;
    position: fixed !important;
    bottom: 2rem; left: 0; right: 0;
  }

  svg {
    fill: $mist;
    width: 5rem;
    position: fixed;
    margin: 0 auto;
    top: 0; bottom: 0; left: 0; right: 0;
  }
}
</style>
