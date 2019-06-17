<template>
  <div :class='`check-mark flex-center ${ checked ? "active" : "not-active" }`'>
    <check />
  </div>
</template>

<script>
import Check from '@/assets/icons/quizzes/Check.svg';

export default {
  name: 'CheckMark',
  components: { Check },
  props: ['checked']
}
</script>

<style lang='scss' scoped>
.check-mark {
  flex: 0 0 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 1rem 0 0;
  border-radius: 4rem;
  position: relative;

  &.active {
    background-color: $pinky;
  }

  &.not-active {
    background-color: $mr-grey;
  }

  svg {
    fill: $snow;
    transform: scale(0.5);
    position: absolute;
  }
}
</style>
