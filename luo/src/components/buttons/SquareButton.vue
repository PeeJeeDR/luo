<template>
  <button :disabled='disabled' v-ripple :class='`square-button ${ disabled ? "disabled" : "active" }`'>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SquareButton',
  props: ['disabled']
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

  &.active {
    @include gradient;
  }

  &.disabled {
    background-color: $dawn;
  }

  svg {
    fill: $snow;
  }
}
</style>
