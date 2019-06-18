<template>
  <div :class='`category ${ category.slug === selectedCategory && "selected" }`'>
    <div v-ripple class='container flex align-center' @click='atCategoryClick'>
      <img 
        :src='require(`@/assets/icons/categories/${ category.slug }.png`)' 
        :name='category.slug' 
        :alt='`${ capFirstChar(category.category) } icon.`'
      >
      <h4 class='heading h--m'>{{ capFirstChar(category.category) }}</h4>
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
  props: ['category'],
  computed: {
    ...mapState('Sidebar', ['selectedCategory'])
  },
  methods: {
    atCategoryClick () {
      enableBodyScroll(document.getElementsByTagName('body')[0]);

      if (this.category.slug !== 'suggest') {
        this.$store.dispatch('Sidebar/onCategoryClick', { categoryId: this.category.slug });
        this.$store.dispatch('Quizzes/fetchQuizzesByCategory', { categoryId: this.category.slug });
      }
      
      if (this.category.slug === 'suggest') {
        this.$store.dispatch('Sidebar/closeSidebar');
        this.$store.dispatch('Modals/openModal', { type: 'suggest-category' });
      }
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

      &[name='suggest'] {
        transform: scale(0.7);
      }
    }

    h4 {
      color: $texty;
      margin-left: 1rem;
    }
  }
}
</style>
