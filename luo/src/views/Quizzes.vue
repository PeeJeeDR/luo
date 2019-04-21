<template>
  <div>
    <quiz-overview />
  </div>
</template>

<script>
import QuizOverview from '@/components/quizzes/QuizOverview';

export default {
  name: 'Quizzes',
  components: { QuizOverview },
  beforeCreate () {
    this.$store.dispatch('Quizzes/fetchQuizzes');
  }
}
</script>

<style>

</style>
