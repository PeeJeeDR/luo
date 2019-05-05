<template>
  <div :class='`categories ${ state }`'>
    <div class='wrapper' v-if='!loading'>
      <category v-for='(category, i) in categories' :key='i' :data='category'/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Category from '@/components/categories/Category';

export default {
  name: 'Categories',
  components: { Category },
  props: ['state'],
  computed: {
    ...mapState('Categories', ['categories', 'loading'])
  }
}
</script>

<style lang='scss' scoped>
.categories {
  background-color: $snow;
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 1;
  transition: $easy;
  padding: 5.5rem 0;
  overflow: scroll;

  &.open {
    top: 0;
  }

  &.closed {
    top: 100vh;
  }
}
</style>
