<template>
  <div class='create-quiz align-center page-small-header'>
    <div class='big-wrapper'>
      <!-- Modal for creating questions. -->
      <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
        <modal v-if='modalIsOpen'/>
      </transition>

      <!-- Create icon when there are no questions made. -->
      <create v-if='shouldIconRender()'/>

      <!-- Made questions. -->
      <div v-for='(question, i) in !editMode ? questions : quizToBeEdited.questions' :key='i'>
        <question :question='question' :number='i'/>
      </div>

      <!-- Create question button. -->
      <default-button :content='"create question"' @click.native='onQuestionCreate'/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Create from '@/assets/icons/quizzes/Create.svg';
import DefaultButton from '@/components/buttons/DefaultButton';
import Modal from '@/components/modals/Modal';
import Question from '@/components/quizzes/Question';

export default {
  name: 'CreateQuiz',
  components: { Create, DefaultButton, Modal, Question },
  computed: {
    ...mapState('Modals', ['modalIsOpen']),
    ...mapState('CreateQuiz', ['questions', 'isQRQuiz', 'editMode', 'quizToBeEdited'])
  },
  created () {
    // Set header content.
    this.$store.dispatch('Header/onPageLoad', { 
      title: this.isQRQuiz ? 'Create QR code quiz' : 'Create quiz',
      leftIcon: 'back',
      rightIcon: 'save'
    });
  },
  methods: {
    shouldIconRender () {
      if (!this.editMode && this.questions.length === 0) {
        return true;
      } 

      if (this.editMode && this.quizToBeEdited && this.quizToBeEdited.questions.length === 0) {
        return true;
      }

      return false;
    },

    onQuestionCreate () {
      this.$store.dispatch('CreateQuiz/onNewQuestionButton');
    }
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {
  position: relative;
  height: 100%;
  overflow: scroll;
  padding-bottom: 7rem;

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
