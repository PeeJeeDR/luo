<template>
  <button class='default-button' v-ripple>
    <p class='paragraph p--weight-bold p--color-light p--m'>{{ content }}</p>
  </button>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: ['content']
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
}
</style>
