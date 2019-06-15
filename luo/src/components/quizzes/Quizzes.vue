<template>
  <div class='quizzes'>
    <div class='big-wrapper'>
      <!-- === LOADER === -->
      <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

      <!-- === QUIZ INFO MODAL === -->
      <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
        <modal v-if='modalIsOpen'/>
      </transition>

      <!-- === QUIZ OVERVIEW === -->
      <div class='overview flex flex-wrap justify-center' v-if='!loading'>
        <quiz v-for='(quiz, i) in quizzes' :key='i' :quiz='quiz' :index='i'/>
      </div>

      <!-- === INFO TEXT WHEN THERE ARE NO QUIZZES FOUND === -->
      <h2 v-if='quizzes.length === 0 && !loading' class='big-wrapper heading h--l h--color-mist h--align-center'>
        Oops! It looks like there are no quizzes made! Are you the first one? ;-)
      </h2>
    </div>
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
    ...mapState('Modals', ['modalIsOpen'])
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

  .overview {
    padding: 4rem 0 7rem 0;
  }
}
</style>
