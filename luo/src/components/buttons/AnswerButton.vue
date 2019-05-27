<template>
  <button :class='`answer-button ${ evaluation }`'>
    <p class='paragraph p--weight-bold'>{{ content }}</p>
  </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AnswerButton',
  props: ['content', 'evaluation']
}
</script>

<style lang='scss' scoped>
.answer-button
{
  @include subtileShadow;
  padding: 1.3rem;
  margin-top: 0.5rem;
  background-color: $snow;
  border-radius: $smallRadius;
  border: none;
}
</style>