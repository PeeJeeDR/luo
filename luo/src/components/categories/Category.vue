<template>
  <div class='category'>
    <div v-ripple class='container flex align-center' @click='atCategoryClick'>
      <img :src='require(`@/assets/icons/categories/${ data.slug }.png`)' :alt='`${ capFirstChar(data.category) } icon.`'>
      <h4>{{ capFirstChar(data.category) }}</h4>
    </div>
  </div>
</template>

<script>
import GlobalMethods from '@/mixins/GlobalMethods';

export default {
  name: 'Category',
  mixins: [GlobalMethods],
  props: ['data'],
  methods: {
    atCategoryClick () {
      this.$store.dispatch('Sidebar/closeSidebar');
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

  .container {
    padding: 0.5rem;

    img {
      width: 2.5rem;
    }

    h4 {
      color: $texty;
      margin-left: 1rem;
    }
  }
}
</style>
