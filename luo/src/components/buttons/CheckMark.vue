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
  flex: 0 0 2rem;
  width: 2rem;
  height: 2rem;
  margin: 0 1rem 0 0;
  border-radius: 4rem;

  &.active {
    background-color: $pinky;
  }

  &.not-active {
    background-color: $mr-grey;
  }

  svg {
    fill: $snow;
    transform: scale(0.35);
    position: absolute;
  }
}
</style>
