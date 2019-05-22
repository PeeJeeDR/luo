<template>
  <div class='categories' v-if='!loading'>
    <category v-for='(category, i) in categories' :key='i' :data='category' :selected='selectedCategoryId' @click.native='onCategorySelect(category.id)'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Category from '@/components/categories/Category';

export default {
  name: 'Categories',
  components: { Category },
  data: () => ({
    selectedCategoryId: ''
  }),
  computed: {
    ...mapState('Categories', ['categories', 'loading'])
  },
  methods: {
    onCategorySelect (id) {
      this.selectedCategoryId = id;
    }
  }
}
</script>

<style lang='scss' scoped>
.categories {
  background-color: $snow;
  z-index: 1;
  transition: all $fast ease-in-out;
  padding: 0;
}
</style>
