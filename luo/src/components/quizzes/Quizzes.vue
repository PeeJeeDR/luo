<template>
  <div class='quizzes'>
    <!-- === PLAY QUIZ === -->
    <play-quiz v-if='quizIsPlaying'/>

    <div class='big-wrapper'>
      <!-- === LOADER === -->
      <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

      <!-- === QUIZ INFO MODAL === -->
      <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
        <modal v-if='modalIsOpen'/>
      </transition>

      <!-- === QUIZ OVERVIEW === -->
      <div class='quizzes-overview' v-if='!loading'>
        <quiz v-for='(quiz, i) in quizzes' :key='i' :data='quiz' :index='i'/>
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
import PlayQuiz from '@/components/play/PlayQuiz';

export default {
  name: 'Quizzes',
  components: { Modal, Quiz, MoonLoader, PlayQuiz },
  computed: {
    ...mapState('Quizzes', ['quizzes', 'loading']),
    ...mapState('Modals', ['modalIsOpen']),
    ...mapState('PlayQuiz', ['quizIsPlaying'])
  },
  created () {
    this.handleHeader();
  },
  methods: {
    handleHeader () {
      this.$store.dispatch('Header/onPageLoad', { 
        title: 'New',
        leftIcon: 'hamburger',
        rightIcon: undefined
      });

      this.$store.dispatch('Navigation/onAppLoad');
    }
  },
  watch: {
    quizIsPlaying () {
      this.handleHeader();
    }
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
