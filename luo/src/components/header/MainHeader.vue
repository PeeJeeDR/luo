<template>
  <header :class='headerTitle'>
    <div class='wrapper'>
      <div v-if='headerTitle !== "profile"' class='nav-props flex justify-between align-center'>
        <div class='icon'>
          <hamburger v-if='leftIcon === "hamburger"' @click='openSidebar'/>
          <back v-if='leftIcon === "back"' @click='$router.push("/")'/>
        </div>
        
        <h2 v-if='headerTitle'>{{ capFirstChar(headerTitle) }}</h2>

        <div class='icon'>
          <search v-if='rightIcon === "search"'/>
          <save v-if='rightIcon === "save" && questions.length > -1' @click='openQuizOptionsModal'/>
        </div>
      </div>

      <transition name='fade-in-out'>
        <profile-in-header v-if='headerTitle === "profile"'/>
      </transition>
    </div>
  </header>
</template>

<script>
import GlobalMethods from '@/mixins/GlobalMethods';
import { disableBodyScroll } from 'body-scroll-lock';
import { mapState } from 'vuex';
import ProfileInHeader from '@/components/profile/ProfileInHeader';
import hamburger from '@/assets/icons/main-header/Hamburger.svg';
import Search from '@/assets/icons/main-header/Search.svg';
import Save from '@/assets/icons/main-header/Save.svg';
import Back from '@/assets/icons/main-header/Back.svg';

export default {
  name: 'MainHeader',
  mixins: [GlobalMethods],
  components: { ProfileInHeader, hamburger, Search, Save, Back },
  props: ['render'],
  computed: {
    ...mapState('Header', ['headerTitle', 'leftIcon', 'rightIcon']),
    ...mapState('CreateQuiz', ['questions'])
  },
  methods: {
    openSidebar () {
      disableBodyScroll(document.getElementsByTagName('body')[0]);
      this.$store.dispatch("Sidebar/openSidebar");
    },

    openQuizOptionsModal () {
      if (this.questions.length > -1) {
        this.$store.dispatch('Modals/openModal', { type: 'save-quiz' });
      }
    }
  }
}
</script>

<style lang='scss' scoped>
header {
  @include gradient;
  border-bottom-left-radius: $largeRadius;
  border-bottom-right-radius: $largeRadius;
  transition: margin $fast ease-in-out, height $fast ease-in-out 100ms;
  position: fixed;
  width: 100%;
  top: 0;
  height: 4.5rem;
  z-index: 2;
  overflow: hidden;

  &.hide {
    margin-top: -4.5rem;
  }

  &.profile {
    height: 11rem;
  } 

  .wrapper {
    height: 100%;

    .nav-props {
      height: 100%;
    }
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;

    svg {
      width: 100%;
      height: 100%;
      fill: $snow;
    }
  }

  h2 {
    color: $snow;
    font-size: $bran;
  }
}
</style>
