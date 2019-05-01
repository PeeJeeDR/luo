<template>
  <div class='quiz-overview'>
    <div v-for='(quiz, i) in quizzes' :key='i'>
      <quiz :data='quiz'/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Quiz from '@/components/quizzes/Quiz';

export default {
  name: 'QuizOverview',
  components: { Quiz },
  computed: {
    ...mapState('Quizzes', ['quizzes'])
  }
}
</script>

<style lang='scss' scoped>
.quiz-overview {
  width: 94%;
  margin: 0 auto;
  padding: 4.5rem 0 5rem 0;
}
</style>
