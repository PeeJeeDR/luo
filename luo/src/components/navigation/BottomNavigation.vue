<template>
  <div class='bottom-navigation flex-center'>

    <!-- === LEFT === -->
    <div class='icon-container flex'>
      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "new" })'>
        <new :class='selectedOverview === "new" && "active"'/>
      </div>

      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "popular" })'>
        <popular :class='selectedOverview === "popular" && "active"'/>
      </div>
    </div>
    <!-- ========== -->

    <!-- === CENTER === -->
    <square-button :disabled='fire.auth().currentUser !== null ? false : true' class='add' @click.native='$router.push("/quizzes/create");'>
      <h2>+</h2>
    </square-button>
    <!-- ========== -->

    <!-- === RIGHT === -->
    <div class='icon-container flex'>
      <div class='icon flex-center' @click='$store.dispatch("Navigation/onIconClick", { selected: "interests" })'>
        <star :class='selectedOverview === "interests" && "active"'/>
      </div>

      <div class='icon flex-center' @click='onProfileClick'>
        <profile :class='selectedOverview === "profile" && "active"'/>
      </div>
    </div>
    <!-- ========== -->

  </div>
</template>

<script>
import { fire } from '@/firebase/firebase'; 
import { mapState } from 'vuex';
import SquareButton from '@/components/buttons/SquareButton';
import New from '@/assets/icons/bottom-nav/New.svg';
import Popular from '@/assets/icons/bottom-nav/Popular.svg';
import Star from '@/assets/icons/bottom-nav/Star.svg';
import Profile from '@/assets/icons/bottom-nav/Profile.svg';

export default {
  name: 'BottomNavigation',
  components: { SquareButton, New, Popular, Star, Profile },
  data: () => ({ fire }),
  computed: {
    ...mapState('Navigation', ['selectedOverview'])
  },
  methods: {
    onProfileClick () {
      if (fire.auth().currentUser !== null) {
        console.log('first if', fire.auth().currentUser);
        this.$store.dispatch("Navigation/onIconClick", { selected: "profile" })
      }

      if (fire.auth().currentUser === null) {
        console.log('second if', fire.auth().currentUser);
        this.$router.push('/authentication');
      }
    }
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
  padding: 0.6rem 0;
  z-index: 2;

  .add {
    width: 3rem;
    height: 3rem;
    margin: 0 1rem;

    h2 {
      transform: rotate(45deg);
      margin: -1.4rem;
      font-weight: lighter;
      font-size: 2.4rem;
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
      transition: all $fast ease-in-out;

      &.active {
        fill: $pinky;
      }
    }
  }
}
</style>
