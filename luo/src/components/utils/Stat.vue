<template>
  <div :class='`stat ${ color }`'>
    <p class='paragraph p--m'>{{ title }}</p>
    <p class='paragraph p--m p--weight-bold'>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'Stat',
  props: ['title', 'value', 'color']
}
</script>

<style lang='scss' scoped>
.stat
{
  &.light {
    p:first-child {
      color: $dawn;
    }

    p:last-child {
      margin-top: 0.1rem;
      color: $snow;
    }
  }
}
</style>