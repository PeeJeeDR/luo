<template>
  <header>
    <div class='wrapper flex justify-between align-center default-vp'>
      <hamburger class='hamburger' @click='$store.dispatch("Sidebar/openSidebar")'/>
      <h2>Title</h2>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import hamburger from '@/assets/icons/Hamburger.svg';

export default {
  name: 'MainHeader',
  components: { hamburger },
  props: ['render']
}
</script>

<style lang='scss' scoped>
header {
  @include gradient;
  border-bottom-left-radius: $largeRadius;
  border-bottom-right-radius: $largeRadius;
  transition: $easy;
  height: 5rem;

  &.hide {
    margin-top: -10rem;
  }

  .wrapper {
    height: 100%;
  }

  .hamburger {
    width: 2rem;
    height: 2rem;
    fill: $snow;
  }

  h2 {
    color: $snow;
  }
}
</style>
