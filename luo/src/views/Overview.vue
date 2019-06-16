<template>
  <div class='overview big-wrapper'>
    <quizzes />
  </div>
</template>

<script>
import Quizzes from '@/components/quizzes/Quizzes';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { mapState } from 'vuex';

export default {
  name: 'Overview',
  components: { Quizzes, BottomNavigation },
  computed: {
    ...mapState('Navigation', ['selectedOverview'])
  }
}
</script>

<style lang='scss' scoped>
.overview {
  padding: 4.5rem 0 6rem 0;
}
</style>


