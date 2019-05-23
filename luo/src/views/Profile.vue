<template>
  <div class='profile wrapper'>
    <recent-quizzes />
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import RecentQuizzes from '@/components/profile/RecentQuizzes';

export default {
  name: 'Profile',
  components: { RecentQuizzes },
  created () {
    this.$store.dispatch('Navigation/onAppLoad');
    this.$store.dispatch('Users/fetchUserById', { id: fire.auth().currentUser.uid });
  }
}
</script>

<style lang='scss' scoped>
.profile
{
  padding-top: 12rem;
}
</style>