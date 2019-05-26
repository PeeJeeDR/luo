<template>
  <div class='quizzes big-wrapper'>
    <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
      <modal v-if='modalIsOpen'/>
    </transition>

    <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

    <div class='quizzes-overview' v-if='!loading'>
      <quiz v-for='(quiz, i) in quizzes' :key='i' :data='quiz' :index='i'/>
    </div>

    <h2 v-if='quizzes.length === 0 && !loading' class='big-wrapper heading h--l h--color-mist h--align-center'>
      Oops! It looks like there are no quizzes made! Are you the first one? ;-)
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MoonLoader from 'vue-spinner/src/MoonLoader';
import Modal from '@/components/modals/Modal';
import Quiz from '@/components/quizzes/Quiz';
import Categories from '@/components/categories/Categories';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default {
  name: 'Quizzes',
  components: { Modal, Quiz, MoonLoader },
  computed: {
    ...mapState('Quizzes', ['quizzes', 'loading']),
    ...mapState('Modals', ['modalIsOpen']),
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
}
</style>
