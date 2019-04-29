<template>
  <div>
    <quiz-overview />
    <bottom-navigation />
  </div>
</template>

<script>
import QuizOverview from '@/components/quizzes/QuizOverview';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default {
  name: 'Quizzes',
  components: { QuizOverview, BottomNavigation },
  beforeCreate () {
    this.$store.dispatch('Quizzes/fetchQuizzes');
  }
}
</script>

<style lang='scss' scoped>

</style>
