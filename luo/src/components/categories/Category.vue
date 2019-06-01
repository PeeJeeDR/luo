<template>
  <div :class='`category ${ data.id === selectedCategory && "selected" }`'>
    <div v-ripple class='container flex align-center' @click='atCategoryClick'>
      <img :src='require(`@/assets/icons/categories/${ data.slug }.png`)' :alt='`${ capFirstChar(data.category) } icon.`'>
      <h4 class='heading h--m'>{{ capFirstChar(data.category) }}</h4>
    </div>
  </div>
</template>

<script>
import { enableBodyScroll } from 'body-scroll-lock';
import GlobalMethods from '@/mixins/GlobalMethods';
import { mapState } from 'vuex';

export default {
  name: 'Category',
  mixins: [GlobalMethods],
  props: ['data'],
  computed: {
    ...mapState('Sidebar', ['selectedCategory'])
  },
  methods: {
    atCategoryClick () {
      enableBodyScroll(document.getElementsByTagName('body')[0]);
      this.$store.dispatch('Sidebar/onCategoryClick', { categoryId: this.data.id });
      this.$store.dispatch('Quizzes/fetchQuizesByCategory', { categoryId: this.data.id });
    }
  }
}
</script>

<style lang='scss' scoped>
.category {
  margin: 0.5rem 0;
  color: $texty;
  white-space: nowrap;
  padding: 0 1rem;

  &.selected {
    background-color: lighten($pinky, 40%);
    border-left: 5px solid $pinky;
    padding: 0 calc(1rem - 5px);

    h4 {
      color: $pinky !important;
    }
  }

  .container {
    padding: 0.5rem;

    img {
      width: 2rem;
    }

    h4 {
      color: $texty;
      margin-left: 1rem;
    }
  }
}
</style>
