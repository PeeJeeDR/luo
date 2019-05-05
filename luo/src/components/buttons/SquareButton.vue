<template>
  <button v-ripple class='square-button'>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SquareButton'
}
</script>

<style lang='scss' scoped>
.square-button {
  @include gradient;
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  transform: rotate(45deg);
  color: $snow;

  svg {
    fill: $snow;
  }
}
</style>
