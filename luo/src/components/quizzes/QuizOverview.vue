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
  
}
</style>
