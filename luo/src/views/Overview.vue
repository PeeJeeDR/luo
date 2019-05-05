<template>
  <div class='page'>
    <quizzes />
    <bottom-navigation />
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
  },
  created () {
    this.$store.dispatch('Navigation/onOverviewLoad');
    this.$store.dispatch('Header/onPageLoad', { title: this.selectedOverview, leftIcon: 'hamburger' });
  }
}
</script>
