<template>
  <button :class='`default-button ${ extraClass }`' v-ripple>
    <p class='paragraph p--weight-bold p--color-light p--m'>{{ content }}</p>
  </button>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: ['content', 'extraClass']
}
</script>

<style lang='scss' scoped>
.default-button {
  @include gradient;
  @include defaultShadow;
  border-radius: $smallRadius;
  padding: 1.2rem 1rem;
  width: 100%;
  border: none;
  outline: none;

  &.enabled {
    @include gradient;
  }

  &.disabled {
    background: none !important;
    background-color: $dawn !important;
  }
}
</style>
