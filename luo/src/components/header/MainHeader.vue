<template>
  <header :class='`main-header ${ headerTitle }`'>
    <div class='wrapper'>
      <div v-if='headerTitle !== "profile"' class='nav-props flex justify-between align-center'>
        <div :class='`icon flex-center ${ leftIcon }`' @click='leftIconClick'>
          <hamburger v-if='leftIcon === "hamburger"'/>
          <back v-if='leftIcon === "back"'/>
        </div>
        
        <h2 v-if='headerTitle'>{{ capFirstChar(headerTitle) }}</h2>

        <div :class='`icon flex-center ${ rightIcon }`' @click='rightIconClick'>
          <search v-if='rightIcon === "search"'/>
          <save v-if='shouldRenderSave()'/>
        </div>
      </div>

      <transition name='fade-from-left'>
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
    ...mapState('Modals', ['modalIsOpen']),
    ...mapState('CreateQuiz', ['quiz'])
  },
  methods: {
    leftIconClick () {
      switch (this.leftIcon) {
        case 'hamburger':
          this.openSidebar();
        break;

        case 'back':
          this.$router.back();
        break;
      } 
    },

    rightIconClick () {
      switch (this.rightIcon) {
        case 'search':
          
        break;

        case 'save':
          this.openQuizOptionsModal();
        break;
      } 
    },

    openSidebar () {
      disableBodyScroll(document.getElementsByTagName('body')[0]);

      setTimeout(() => {
        this.$store.dispatch('Sidebar/openSidebar');
      }, this.modalIsOpen ? 500 : 0);

      this.$store.dispatch('Modals/closeModal');
    },

    openQuizOptionsModal () {
      this.$store.dispatch('Modals/openModal', { type: 'save-quiz' });
    },

    exitPlayQuiz () {
      this.$store.dispatch('PlayQuiz/stopQuiz');
      this.$router.push('/');
    },

    shouldRenderSave () {
      return this.rightIcon === 'save' && this.quiz.questions.length > 0;
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
  z-index: 4;
  overflow: hidden;

  &.hide {
    margin-top: -4.5rem;
  }

  &.profile {
    height: 8.5rem;
  } 

  .wrapper {
    height: 100%;

    .nav-props {
      height: 100%;
      margin: 0 auto;

      @include desktop {
        width: calc(100% - 2rem);
      }
    }
  }

  .icon {
    width: 3rem;
    height: 3rem;
    transition: all $fast ease-in-out;
    border-radius: 20rem;

    &:hover {
      background-color: rgba($snow, 0.2);
      cursor: pointer;
    }

    &.hamburger {
      @include desktop {
        transform: translateX(-0.25rem)
      }
    }

    svg {
      width: 50%;
      height: 50%;
      fill: $snow;
    }

    &.close {
      width: 1rem;
    }
  }

  h2 {
    color: $snow;
    font-size: $bran;
  }


  // HEADER PROFILE INFO
  .fade-from-left-enter-active {
    animation: fadeInLeft 500ms;
    animation-delay: 300ms;
    opacity: 0;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      margin-left: -100px;
    }

    to {
      opacity: 1;
      margin-left: 0
    }
  }
  /* ========== */
}
</style>
