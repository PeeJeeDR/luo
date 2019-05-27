<template>
  <div :class='`question-title ${ evaluation }`'>
    <h2 class='heading h--xxm h--color-primary'>{{ questions[currentQuestion].question }}</h2>
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