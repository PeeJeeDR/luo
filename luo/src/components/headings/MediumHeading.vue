<template>
  <h2 :class='`medium-heading ${ color }`'>
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'MediumHeading',
  props: ['color']
}
</script>

<style lang='scss' scoped>
.medium-heading {
  font-size: $bran;
  @include defaultHeaderColors;
}
</style>
