<template>
  <div class='create-quiz big-wrapper align-center'>
    <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
      <create-question-modal v-if='questionModal'/>
      <quiz-options-modal v-if='quizOptionsModal'/>
    </transition>

    <create v-if='questions.length === 0'/>

    <div v-for='(question, i) in questions' :key='i'>
      <question :data='question' :number='i'/>
    </div>

    <default-button :content='"create question"' @click.native='$store.dispatch("Modals/openQuestionModal")'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Create from '@/assets/icons/quizzes/Create.svg';
import DefaultButton from '@/components/buttons/DefaultButton';
import CreateQuestionModal from '@/components/modals/CreateQuestionModal';
import QuizOptionsModal from '@/components/modals/QuizOptionsModal';
import Question from '@/components/quizzes/Question';

export default {
  name: 'CreateQuiz',
  components: { Create, DefaultButton, CreateQuestionModal, QuizOptionsModal, Question },
  computed: {
    ...mapState('Modals', ['questionModal', 'quizOptionsModal']),
    ...mapState('CreateQuiz', ['questions'])
  },
  created () {
    this.$store.dispatch('Header/onPageLoad', { 
      title: 'create quiz', 
      leftIcon: 'back',
      rightIcon: 'save'
    });
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {
  padding: 4.5rem 0 5rem 0;
  position: relative;
  height: 100%;

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
