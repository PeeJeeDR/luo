<template>
  <header>
    <div class='wrapper flex justify-between align-center default-vp'>
      <div class='icon'>
        <hamburger v-if='meta.leftIcon === "hamburger"' @click='openSidebar'/>
        <back v-if='meta.leftIcon === "back"' @click='$router.push("/")'/>
      </div>
      
      <h2 v-if='meta.title'>{{ capFirstChar(meta.title) }}</h2>

      <div class='icon'>
        <search v-if='meta.rightIcon === "search"'/>
        <save v-if='meta.rightIcon === "save" && questions.length > 0' @click='openQuizOptionsModal'/>
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
import Back from '@/assets/icons/main-header/Back.svg';

export default {
  name: 'MainHeader',
  mixins: [GlobalMethods],
  components: { hamburger, Search, Save, Back },
  props: ['render'],
  data: () => ({
    leftIcon: undefined,
    rightIcon: undefined,
    title: undefined,
    meta: ''
  }),
  created () {
    this.meta = this.$route.meta.header;
  },
  computed: {
    ...mapState('CreateQuiz', ['questions'])
  },
  methods: {
    openSidebar () {
      disableBodyScroll(document.getElementsByTagName('body')[0]);
      this.$store.dispatch("Sidebar/openSidebar");
    },

    openQuizOptionsModal () {
      if (this.questions.length > 0) {
        this.$store.dispatch("Quizzes/postNewQuiz");
      }
    }
  },
  watch: {
    '$route.meta': function () {
      this.meta = this.$route.meta.header;
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
      fill: $snow;
    }
  }

  h2 {
    color: $snow;
    font-size: $bran;
  }
}
</style>
