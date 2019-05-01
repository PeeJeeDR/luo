<template>
  <div class='quiz-overview'>
    <div v-for='(quiz, i) in quizzes' :key='i'>
      <quiz :data='quiz'/>
    </div>

    <h2 v-if='quizzes.length === 0'>
      Oops! It looks like there are no quizzes made! Are you the first one? ;-)
    </h2>
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

  h2 {
    color: $mist;
    text-align: center;
    width: 90%;
    margin: 4rem auto;
  }
}
</style>
