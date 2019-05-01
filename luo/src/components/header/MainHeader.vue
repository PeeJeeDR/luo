<template>
  <header>
    <div class='wrapper flex justify-between align-center default-vp'>
      <div class='icon'>
        <hamburger @click='openSidebar'/>
      </div>
      
      <h2>{{ selectedOverview.charAt(0).toUpperCase() + selectedOverview.substr(1) }}</h2>

      <div class='icon'>
        <search />
      </div>
    </div>
  </header>
</template>

<script>
import { disableBodyScroll } from 'body-scroll-lock';
import { mapState } from 'vuex';
import hamburger from '@/assets/icons/main-header/Hamburger.svg';
import Search from '@/assets/icons/main-header/Search.svg';

export default {
  name: 'MainHeader',
  components: { hamburger, Search },
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

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    //background-color: red;

    svg {
      width: 100%;
      height: 100%;
      fill: $snow !important;
      color: $snow;
    }
  }

  h2 {
    color: $snow;
    font-size: $bran;
  }
}
</style>
