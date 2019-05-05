<template>
  <div class='quiz-overview big-wrapper'>
    <categories :state='categoriesIsOpen ? "open" : "closed"'/>

    <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>

    <div v-for='(quiz, i) in quizzes' :key='i'>
      <quiz v-if='!loading' :data='quiz'/>
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
  name: 'QuizOverview',
  components: { Quiz, MoonLoader, Categories },
  computed: {
    ...mapState('Quizzes', ['quizzes', 'loading']),
    ...mapState('Navigation', ['selectedOverview', 'categoriesIsOpen'])
  },
  methods: {
    shouldRenderCategories () {
      if (this.categoriesIsOpen) {
        disableBodyScroll(document.getElementsByTagName('body')[0]);
      }

      if (!this.categoriesIsOpen) {
        enableBodyScroll(document.getElementsByTagName('body')[0]);
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz-overview {
  padding: 4.5rem 0 5rem 0;

  .spinner {
    margin-top: 5rem;
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
