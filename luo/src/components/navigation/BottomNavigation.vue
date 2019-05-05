<template>
  <div class='bottom-navigation flex-center'>

    <!-- === LEFT === -->
    <div class='icon-container flex'>
      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "new", isPageLoad: false })'>
        <new :class='selectedOverview === "new" && "active"'/>
      </div>

      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "popular", isPageLoad: false })'>
        <popular :class='selectedOverview === "popular" && "active"'/>
      </div>
    </div>
    <!-- ========== -->

    <!-- === CENTER === -->
    <square-button class='add' @click.native='$router.push("/quizzes/create"); $store.commit("Header/SET_HEADER_TITLE", "create quiz");'>
      <h3 class='heading h--large bright'>+</h3>
    </square-button>
    <!-- ========== -->

    <!-- === RIGHT === -->
    <div class='icon-container flex'>
      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "interests", isPageLoad: false })'>
        <star :class='selectedOverview === "interests" && "active"'/>
      </div>

      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "category", isPageLoad: false })'>
        <category :class='selectedOverview === "category" && "active"'/>
      </div>
    </div>
    <!-- ========== -->

  </div>
</template>

<script>
import { mapState } from 'vuex';
import SquareButton from '@/components/buttons/SquareButton';
import New from '@/assets/icons/bottom-nav/New.svg';
import Popular from '@/assets/icons/bottom-nav/Popular.svg';
import Star from '@/assets/icons/bottom-nav/Star.svg';
import Category from '@/assets/icons/bottom-nav/Category.svg';

export default {
  name: 'BottomNavigation',
  components: { SquareButton, New, Popular, Star, Category },
  computed: {
    ...mapState('Navigation', ['selectedOverview'])
  }
}
</script>

<style lang='scss' scoped>
.bottom-navigation {
  @include topShadow;
  background-color: $snow;
  bottom: 0;
  position: fixed;
  margin: auto;
  width: 100%;
  height: auto;
  padding: 0.6rem 0;
  z-index: 2;

  .add {
    width: 3rem;
    height: 3rem;
    margin: 0 1rem;
    animation: bounce 750ms ease-in-out 1s;

    h3 {
      transform: rotate(45deg);
      margin: -1.5rem;
      font-weight: lighter;
    }
  }

  .icon {
    margin: 0 0.5rem;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;

    svg {
      fill: $dawn;
      width: 100%;
      height: 100%;
      transition: $easy;

      &.active {
        fill: $pinky;
      }
    }
  }
}
</style>
