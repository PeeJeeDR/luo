<template>
  <div :class='`stat ${ color } ${ align }`'>
    <p class='paragraph p--m'>{{ title }}</p>
    <p class='paragraph p--m p--weight-bold'>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'Stat',
  props: ['title', 'value', 'color', 'align']
}
</script>

<style lang='scss' scoped>
.stat
{
  p {
    margin-top: 0.1rem;
  }

  &.light {
    p:first-child {
      color: $dawn;
    }

    p:last-child {
      color: $snow;
    }
  }

  &.primary {
    p:first-child {
      color: $mist;
    }

    p:last-child {
      color: $pinky;
    }
  }

  &.center {
    text-align: center; 
  }
}
</style>