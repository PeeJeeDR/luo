<template>
  <div class='categories'>
    <category v-for='category in categories' :key='category.slug' :category='category'/>    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Category from '@/components/categories/Category';
import Add from '@/assets/icons/main-header/Close.svg';

export default {
  name: 'Categories',
  components: { Category, Add },
  computed: {
    ...mapState('Categories', ['categories'])
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
