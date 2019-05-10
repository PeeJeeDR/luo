<template>
  <div class='create-quiz page big-wrapper flex direction-col justify-between align-center'>
    <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
      <create-question-modal v-if='questionModal'/>
      <quiz-options-modal v-if='quizOptionsModal'/>
    </transition>

    
    <create v-if='questions.length === 0'/>

    <div v-for='(question, i) in questions' :key='i'>
      <p>{{ question }}</p>
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

export default {
  name: 'CreateQuiz',
  components: { Create, DefaultButton, CreateQuestionModal, QuizOptionsModal },
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
  padding: 5.5rem 0 2rem 0;
  position: relative;

  .default-button {
    width: 15rem;
    margin: 0 auto;
  }

  svg {
    fill: $mist;
    width: 5rem;
  }
}
</style>
