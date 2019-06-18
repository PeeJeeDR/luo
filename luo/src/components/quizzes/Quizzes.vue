<template>
  <div class='quizzes'>
    <!-- Loader. -->
    <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

    <!-- Quiz overview. -->
    <div class='flex flex-wrap justify-center' v-if='!loading'>
      <quiz v-for='(quiz, i) in quizzes' :key='i' :quiz='quiz' :index='i'/>
    </div>

    <!-- Info text for if there are no quizzes found. -->
    <h2 v-if='quizzes.length === 0 && !loading' class='big-wrapper heading h--l h--color-mist h--align-center'>
      Oops! It looks like there are no quizzes made! Are you the first one? ;-)
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import MoonLoader from 'vue-spinner/src/MoonLoader';
import Modal from '@/components/modals/Modal';
import Quiz from '@/components/quizzes/Quiz';
import Categories from '@/components/categories/Categories';

export default {
  name: 'Quizzes',
  components: { Modal, Quiz, MoonLoader },
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
.quizzes .spinner, .quizzes h2 {
  margin-top: 3rem !important;
}
</style>
