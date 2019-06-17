<template>
  <button :class='`default-button flex-center ${ extraClass }`' v-ripple>
    <p v-if='!loading' class='paragraph p--weight-bold p--color-light p--m'>{{ content }}</p>
    <moon-loader v-if='loading' class='spinner' color='#FFF'/>
  </button>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader';

export default {
  name: 'DefaultButton',
  components: { MoonLoader },
  props: ['content', 'extraClass', 'loading']
}
</script>

<style lang='scss' scoped>
.default-button {
  @include gradient;
  @include defaultShadow;
  border-radius: $smallRadius;
  padding: 0 1rem;
  height: 3.5rem;
  width: 100%;
  border: none;

  &.enabled {
    @include gradient;
  }

  &.disabled {
    background: none !important;
    background-color: $dawn !important;
  }

  .spinner {
    transform: scale(0.6);
  }
}
</style>
