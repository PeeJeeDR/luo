<template>
  <div class='bottom-navigation flex justify-center align-center'>
    <div class='icon-container flex'>
      <div>
        <New />
      </div>

      <div>
        <Popular />
      </div>
    </div>

    <square-button class='add'>
      <h3 class='heading h--large bright'>+</h3>
    </square-button>

    <div class='icon-container flex'>
      <div>
        <Star />
      </div>

      <div>
        <Category />
      </div>
    </div>
  </div>
</template>

<script>
import SquareButton from '@/components/buttons/SquareButton';
import New from '@/assets/icons/bottom-nav/New.svg';
import Popular from '@/assets/icons/bottom-nav/Popular.svg';
import Star from '@/assets/icons/bottom-nav/Star.svg';
import Category from '@/assets/icons/bottom-nav/Category.svg';


export default {
  name: 'BottomNavigation',
  components: { SquareButton, New, Popular, Star, Category },
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
  padding: 1rem 0;

  .add {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 2rem;

    h3 {
      transform: rotate(45deg);
      margin: -1.5rem;
      font-weight: lighter;
    }
  }


  svg {
    fill: $dawn;
    width: 2rem;
    height: 2rem;
    margin: 0 1rem;
  }
}
</style>
