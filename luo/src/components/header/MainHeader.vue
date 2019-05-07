<template>
  <header>
    <div class='wrapper flex justify-between align-center default-vp'>
      <div class='icon'>
        <hamburger v-if='leftIcon === "hamburger"' @click='openSidebar'/>
      </div>
      
      <h2 v-if='headerTitle'>{{ capFirstChar(headerTitle) }}</h2>

      <div class='icon'>
        <search v-if='rightIcon === "search"'/>
        <save v-if='rightIcon === "save"' @click='$store.dispatch("Quizzes/postNewQuiz")'/>
      </div>
    </div>
  </header>
</template>

<script>
import GlobalMethods from '@/mixins/GlobalMethods';
import { disableBodyScroll } from 'body-scroll-lock';
import { mapState } from 'vuex';
import hamburger from '@/assets/icons/main-header/Hamburger.svg';
import Search from '@/assets/icons/main-header/Search.svg';
import Save from '@/assets/icons/main-header/Save.svg';

export default {
  name: 'MainHeader',
  mixins: [GlobalMethods],
  components: { hamburger, Search, Save },
  props: ['render'],
  computed: {
    ...mapState('Header', ['headerTitle', 'leftIcon', 'rightIcon'])
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
  position: fixed;
  width: 100%;
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
