<template>
  <div class='create-quiz big-wrapper align-center page-small-header'>
    <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
      <modal v-if='modalIsOpen'/>
    </transition>

    <create v-if='questions.length === 0'/>

    <div v-for='(question, i) in questions' :key='i'>
      <question :question='question' :number='i'/>
    </div>

    <default-button :content='"create question"' @click.native='$store.dispatch("Modals/openModal", { type: "create-question" })'/>
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
    ...mapState('CreateQuiz', ['questions', 'isQRQuiz'])
  },
  created () {
    this.$store.dispatch('Header/onPageLoad', { 
      title: this.isQRQuiz ? 'Create QR code quiz' : 'Create quiz',
      leftIcon: 'back',
      rightIcon: 'save'
    });
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {
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
