<template>
  <div class='page'>
    <quizzes />
    <bottom-navigation />
  </div>
</template>

<script>
import Quizzes from '@/components/quizzes/Quizzes';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default {
  name: 'Overview',
  components: { Quizzes, BottomNavigation },
  created () {
    this.$store.dispatch('Navigation/onPageLoad');
  }
}
</script>
