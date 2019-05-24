<template>
  <div class='popular-quizzes'>
    <section-title :title='"Popular quizzes"'/>
    <quiz v-for='(quiz, i) in getPopularQuizzes' :key='i' :data='quiz' :index='i'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SectionTitle from '@/components/titles/SectionTitle';
import Quiz from '@/components/quizzes/Quiz';

export default {
  name: 'PopularQuizzes',
  components: { SectionTitle, Quiz },
  computed: {
    ...mapGetters('Quizzes', ['getPopularQuizzes'])
  }
}
</script>

<style lang='scss' scoped>
.popular-quizzes
{
  
}
</style>