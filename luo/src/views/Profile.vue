<template>
  <div class='profile big-wrapper'>
    <!-- Loader. -->
    <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

    <div v-if='!loading'>
      <!-- Quiz info modal. -->
      <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
        <modal v-if='modalIsOpen'/>
      </transition>

      <!-- Quizzes made by the user. -->
      <section-title 
        v-if='publicQuizzesByUser.length > 0' 
        :title='`${ isOtherUser ? "Quizzes of " + user.username : "Your public quizzes" }`'
      />
      <div class='flex flex-wrap justify-center'>
        <quiz v-for='(quiz, i) in publicQuizzesByUser' :key='i' :quiz='quiz' :index='i'/>
      </div>

      <!-- QR code quizzes made by the user. -->
      <section-title 
        v-if='QRQuizzesByUser.length > 0 && !isOtherUser' 
        :title='"Your QR code quizzes"'
      />
      <div class='overview flex flex-wrap justify-center'>
        <quiz v-for='(quiz, i) in QRQuizzesByUser' :key='i' :quiz='quiz' :index='i'/>
      </div>

      <!-- If there are no quizzes. -->
      <h2 v-if='quizzesMadeByUser.length === 0' class='big-wrapper heading h--l h--color-mist h--align-center'>
        It looks like you haven't made any quizzes yet, go make one!
      </h2>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    ...mapState('Users', ['isOtherUser', 'user']),
    ...mapGetters('Quizzes', ['publicQuizzesByUser', 'QRQuizzesByUser'])
  },
  created () {
    this.$store.dispatch('Navigation/onAppLoad');

    if (!fire.auth().currentUser) {
      location.reload();
    }

    if (!this.isOtherUser && fire.auth().currentUser) {
      this.$store.dispatch('Users/fetchUserById', { userId: fire.auth().currentUser.uid, type: 'user' });
      this.$store.dispatch('Quizzes/fetchQuizzesMadeByUserId', { userId: fire.auth().currentUser.uid });
      this.$store.dispatch('Quizzes/fetchQuizzesPlayedByUserId', { userId: fire.auth().currentUser.uid });
    }

    if (this.isOtherUser || fire.auth().currentUser === null) {
      console.log('OTHER USER');
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
  padding: 7.5rem 0 6rem 0;

  .spinner,
  .section-title,
  h2 {
    margin-top: 3rem !important;
  }
}
</style>