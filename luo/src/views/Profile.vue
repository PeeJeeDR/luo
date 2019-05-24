<template>
  <div class='profile big-wrapper'>
    <recent-quizzes v-if='quizzesRecentByUser.length > 0' :quizzes='quizzesRecentByUser'/>
    <popular-quizzes v-if='quizzesRecentByUser.length > 0' :quizzes='quizzesRecentByUser'/>

    <h2 class='big-wrapper heading h--l h--color-mist h--align-center'>
      It looks like you haven't made any quizzes yet, Go make one!
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fire } from '@/firebase/firebase';
import RecentQuizzes from '@/components/profile/RecentQuizzes';
import PopularQuizzes from '@/components/profile/PopularQuizzes';

export default {
  name: 'Profile',
  components: { RecentQuizzes, PopularQuizzes },
  computed: {
    ...mapState('Quizzes', ['quizzesRecentByUser'])
  },
  created () {
    this.$store.dispatch('Navigation/onAppLoad');
    this.$store.dispatch('Users/fetchUserById', { userId: fire.auth().currentUser.uid });
    this.$store.dispatch('Quizzes/fetchQuizzesByUserId', { userId: fire.auth().currentUser.uid });
  }
}
</script>

<style lang='scss' scoped>
.profile
{
  padding-top: 12rem;

  h2 {
    margin-top: 5rem !important;
  }
}
</style>