<template>
  <header :class='open ? "open" : "hide"'>
    <div class='wrapper flex direction-col justify-between default-vp'>
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
  props: ['render'],
  computed: {
    ...mapState('Header', ['open'])
  }
}
</script>

<style lang='scss' scoped>
header {
  @include gradient;
  border-bottom-left-radius: $largeRadius;
  border-bottom-right-radius: $largeRadius;
  transition: $easy;
  height: 10rem;

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
}
</style>
