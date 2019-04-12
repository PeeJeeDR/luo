<template>
  <header>
    <div class='wrapper flex justify-between default-vp'>
      <hamburger class='hamburger' @click='$emit("clicked")'/>
    </div>
  </header>
</template>

<script>
import hamburger from '@/assets/icons/Hamburger.svg';

export default {
  name: 'MainHeader',
  components: { hamburger }
}
</script>

<style lang='scss' scoped>
header {
  @include gradient;
  border-bottom-left-radius: $largeRadius;
  border-bottom-right-radius: $largeRadius;

  .hamburger {
    width: 2rem;
    height: 2rem;
    fill: #fff;
  }
}
</style>
