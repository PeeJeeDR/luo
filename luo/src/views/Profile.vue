<template>
  <div class='profile big-wrapper page-big-header'>
    <!-- === LOADER === -->
    <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

    <div v-if='!loading'>
      <!-- === QUIZ INFO MODAL === -->
      <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
        <modal v-if='modalIsOpen'/>
      </transition>

      <!-- === QUIZZES MADE BY THE USER === -->
      <section-title v-if='quizzesMadeByUser.length > 0' :title='"Your quizzes"'/>
      <div class='flex flex-wrap justify-center'>
        <quiz v-for='(quiz, i) in quizzesMadeByUser' :key='i' :quiz='quiz' :index='i'/>
      </div>

      <!-- === IF THERE ARE NO QUIZZES === -->
      <h2 v-if='quizzesMadeByUser.length === 0' class='big-wrapper heading h--l h--color-mist h--align-center'>
        It looks like you haven't made any quizzes yet, Go make one!
      </h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fire } from '@/firebase/firebase';
import MoonLoader from 'vue-spinner/src/MoonLoader';
import Modal from '@/components/modals/Modal';
import Quiz from '@/components/quizzes/Quiz';
import SectionTitle from '@/components/titles/SectionTitle';

export default {
  name: 'Profile',
  components: { MoonLoader, Modal, Quiz, SectionTitle },
  computed: {
    ...mapState('Quizzes', ['quizzesMadeByUser', 'loading']),
    ...mapState('Modals', ['modalIsOpen']),
    ...mapState('Users', ['isOtherUser', 'user'])
  },
  created () {
    this.$store.dispatch('Navigation/onAppLoad');

    if (!this.isOtherUser) {
      console.log('IS LOGGED IN USER');
      this.$store.dispatch('Users/fetchUserById', { userId: fire.auth().currentUser.uid, type: 'user' });
      this.$store.dispatch('Quizzes/fetchQuizzesMadeByUserId', { userId: fire.auth().currentUser.uid });
      this.$store.dispatch('Quizzes/fetchQuizzesPlayedByUserId', { userId: fire.auth().currentUser.uid });
    }

    if (this.isOtherUser) {
      console.log('IS OTHER USER', this.user);
      this.$store.dispatch('Users/fetchUserById', { userId: this.user.id, type: 'user' });
      this.$store.dispatch('Quizzes/fetchQuizzesMadeByUserId', { userId: this.user.id });
      this.$store.dispatch('Quizzes/fetchQuizzesPlayedByUserId', { userId: this.user.id });
    }
  },
  beforeDestroy () {
    this.$store.dispatch('Users/onProfileDismount');
  }
}
</script>

<style lang='scss' scoped>
.profile
{
  .spinner {
    margin-top: 3rem;
  }

  h2 {
    margin-top: 5rem !important;
  }
}
</style>