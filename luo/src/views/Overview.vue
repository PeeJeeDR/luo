<template>
  <div class='overview'>
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
  height: 100%;
}
</style>


