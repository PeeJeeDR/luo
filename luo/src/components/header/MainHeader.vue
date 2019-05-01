<template>
  <header>
    <div class='wrapper flex justify-between align-center default-vp'>
      <hamburger class='hamburger' @click='openSidebar'/>
      <h2>{{ selectedOverview.charAt(0).toUpperCase() + selectedOverview.substr(1) }}</h2>
    </div>
  </header>
</template>

<script>
import { disableBodyScroll } from 'body-scroll-lock';
import { mapState } from 'vuex';
import hamburger from '@/assets/icons/main-header/Hamburger.svg';

export default {
  name: 'MainHeader',
  components: { hamburger },
  props: ['render'],
  computed: {
    ...mapState('Navigation', ['selectedOverview'])
  },
  methods: {
    openSidebar () {
      disableBodyScroll(document.getElementsByTagName('body')[0]);
      this.$store.dispatch("Sidebar/openSidebar");
    }
  }
}
</script>

<style lang='scss' scoped>
header {
  @include gradient;
  border-bottom-left-radius: $largeRadius;
  border-bottom-right-radius: $largeRadius;
  transition: $easy;
  height: 4.5rem;
  position: sticky;
  top: 0;
  z-index: 2;

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
    font-size: $bran;
  }
}
</style>
