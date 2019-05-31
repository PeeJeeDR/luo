<template>
  <div :class='`question-title ${ evaluation }`'>
    <h2 :key='questions[currentQuestion].question' class='heading h--xm h--color-primary'>{{ questions[currentQuestion].question }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'QuestionTitle',
  props: ['currentQuestion', 'questions'],
  computed: {
    ...mapState('PlayQuiz', ['evaluation'])
  }
}
</script>

<style lang='scss' scoped>
.question-title
{
  h2 {
    margin-top: 0.5rem;
  }
}
</style>