<template>
  <div class='profile big-wrapper page-big-header'>
    <!-- === QUIZ INFO MODAL === -->
    <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
      <modal v-if='modalIsOpen'/>
    </transition>

    <section-title :title='"Quizzes made"'/>
    <div v-for='quiz, i in quizzesMadeByUser' :key='i'>
      <quiz :quiz='quiz' :index='i'/>
    </div>

    <!-- === IF THERE ARE NO QUIZZES === -->
    <h2 v-if='quizzesMadeByUser.length === 0' class='big-wrapper heading h--l h--color-mist h--align-center'>
      It looks like you haven't made any quizzes yet, Go make one!
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fire } from '@/firebase/firebase';
import Modal from '@/components/modals/Modal';
import Quiz from '@/components/quizzes/Quiz';
import SectionTitle from '@/components/titles/SectionTitle';

export default {
  name: 'Profile',
  components: { Modal, Quiz, SectionTitle },
  computed: {
    ...mapState('Quizzes', ['quizzesMadeByUser']),
    ...mapState('Modals', ['modalIsOpen'])
  },
  created () {
    this.$store.dispatch('Navigation/onAppLoad');
    this.$store.dispatch('Users/fetchUserById', { userId: fire.auth().currentUser.uid });
    this.$store.dispatch('Quizzes/fetchQuizzesMadeByUserId', { userId: fire.auth().currentUser.uid });
    this.$store.dispatch('Quizzes/fetchQuizzesPlayedByUserId', { userId: fire.auth().currentUser.uid });
  }
}
</script>

<style lang='scss' scoped>
.profile
{
  h2 {
    margin-top: 5rem !important;
  }
}
</style>