<template>
  <div class='quizzes big-wrapper'>
    <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

    <div class='quizzes-overview' v-if='!loading'>
      <quiz v-for='(quiz, i) in quizzes' :key='i' :data='quiz' :index='i'/>
    </div>

    <h2 v-if='quizzes.length === 0 && !loading'>
      Oops! It looks like there are no quizzes made! Are you the first one? ;-)
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MoonLoader from 'vue-spinner/src/MoonLoader';
import Quiz from '@/components/quizzes/Quiz';
import Categories from '@/components/categories/Categories';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default {
  name: 'Quizzes',
  components: { Quiz, MoonLoader },
  computed: {
    ...mapState('Quizzes', ['quizzes', 'loading']),
  },
  created () {
    this.$store.dispatch('Header/onPageLoad', { 
      title: 'New',
      leftIcon: 'hamburger',
      rightIcon: undefined
    });

    this.$store.dispatch('Navigation/onAppLoad');
  }
}
</script>

<style lang='scss' scoped>
.quizzes {
  height: 100%;

  .spinner {
    margin-top: 6rem;
  }

  .quizzes-overview {
    padding: 4.5rem 0 5rem 0;
  }

  h2 {
    color: $mist;
    text-align: center;
    width: 90%;
    margin: 4rem auto;
    font-size: $khaleesi;
  }
}
</style>
