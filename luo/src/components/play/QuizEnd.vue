<template>
  <div class='quiz-end big-wrapper'>
    <div class='box flex direction-col'>

      <div class='content wrapper flex direction-col align-center justify-center'>
        <h2>You finished this quiz!</h2>

        <default-button :content='"continue"' @click.native='$store.dispatch("PlayQuiz/onQuizEnd")'/>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'QuizEnd',
  components: { DefaultButton }
}
</script>

<style lang='scss' scoped>
.quiz-end
{
  height: 100%;
  padding: 0 0 1rem 0;

  .default-button {
    margin-top: 5rem;
  }
}
</style>