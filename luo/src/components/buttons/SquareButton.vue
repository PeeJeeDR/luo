<template>
  <button v-ripple :class='`square-button ${ extraClass }`'>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SquareButton',
  props: ['extraClass']
}
</script>

<style lang='scss' scoped>
.square-button {
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  transform: rotate(45deg);
  color: $snow;

  &.enabled {
    @include gradient;
  }

  &.disabled {
    background-color: $dawn;
  }

  svg {
    fill: $snow;
    transform: rotate(-45deg);
  }
}
</style>
