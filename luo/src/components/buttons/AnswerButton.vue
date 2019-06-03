<template>
  <button 
    @click='animate = true' 
    :class='`answer-button animated ${ evaluation } ${ animate && evaluation === "correct" && "bounceIn faster" } ${ animate && evaluation === "wrong" && "shake fast" }`' @animationend='animate = false'>
    <p class='paragraph p--weight-bold'>{{ content }}</p>
  </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AnswerButton',
  props: ['content', 'evaluation'],
  data: () => ({
    animate: false
  })
}
</script>

<style lang='scss' scoped>
.answer-button
{
  @include subtileShadow;
  padding: 1.3rem;
  background-color: $snow;
  border-radius: $smallRadius;
  border: none;
  width: calc(100% - 2rem);
  margin: 0.5rem auto 0 auto;
}
</style>