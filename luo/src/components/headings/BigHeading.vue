<template>
  <h1 :class='`big-heading ${ color }`'>
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: 'BigHeading',
  props: ['color']
}
</script>

<style lang='scss' scoped>
.big-heading {
  font-size: $jon;
  @include defaultHeaderColors;
}
</style>
