<template>
  <div class='bottom-navigation flex-center'>
    <div class='icon-container flex'>
      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "new" })'>
        <new :class='selectedOverview === "new" && "active"'/>
      </div>

      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "popular" })'>
        <popular :class='selectedOverview === "popular" && "active"'/>
      </div>
    </div>

    <square-button class='add'>
      <h3 class='heading h--large bright'>+</h3>
    </square-button>

    <div class='icon-container flex'>
      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "interests" })'>
        <star :class='selectedOverview === "interests" && "active"'/>
      </div>

      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "category" })'>
        <category :class='selectedOverview === "category" && "active"'/>
      </div>
    </div>
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

  .add {
    width: 3rem;
    height: 3rem;
    margin: 0 2rem;

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
