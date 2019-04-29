<template>
  <div class='bottom-navigation flex justify-center'>
    <div>

    </div>

    <square-button class='add'>
      <h3 class='heading h--large bright'>+</h3>
    </square-button>

    <div>

    </div>
  </div>
</template>

<script>
import SquareButton from '@/components/buttons/SquareButton';

export default {
  name: 'BottomNavigation',
  components: { SquareButton },
}
</script>

<style lang='scss' scoped>
.bottom-navigation {
  // background-color: $mr-grey;
  background-color: $snow;
  bottom: 0;
  position: sticky;
  margin: auto;
  width: 100%;
  height: auto;
  padding: 1rem 0;

  .add {
    width: 4rem;
    height: 4rem;

    h3 {
      transform: rotate(45deg);
      margin: -1rem;
    }
  }
}
</style>
