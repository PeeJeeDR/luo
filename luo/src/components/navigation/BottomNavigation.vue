<template>
  <div class='bottom-navigation flex justify-center align-center'>
    <div>
      <button v-ripple class='flex justofy-center align-center'>
        <Heart />
      </button>

      <button v-ripple class='flex justofy-center align-center'>
        <Heart />
      </button>
    </div>

    <square-button class='add'>
      <h3 class='heading h--large bright'>+</h3>
    </square-button>

    <div>
      <button v-ripple class='flex justofy-center align-center'>
        <Heart />
      </button>

      <button v-ripple class='flex justofy-center align-center'>
        <Heart />
      </button>
    </div>
  </div>
</template>

<script>
import SquareButton from '@/components/buttons/SquareButton';
import Heart from '@/assets/icons/Heart.svg';

export default {
  name: 'BottomNavigation',
  components: { SquareButton, Heart },
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

  button {
    background: none;
    border: none;
    border-radius: 50rem;
    padding: 0.5rem;

    svg {
      fill: #000;
      width: 2.5rem;
    }
  }
}
</style>
