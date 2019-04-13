<template>
  <button class='default-button'>{{ content }}</button>
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
  border-radius: $largeRadius;
  color: $snow;
  padding: 1rem;
  width: 100%;
  border: none;
  color: $snow;
  font-size: $bran;
  font-weight: bold;
  font-family: $montserrat;
  outline: none;
}
</style>
