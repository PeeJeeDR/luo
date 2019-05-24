<template>
  <div class='recent-quizzes'>
    <section-title :title='"Recent quizzes"'/>

    <quiz v-for='(quiz, i) in quizzesRecentByUser' :key='i' :data='quiz' :index='i'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SectionTitle from '@/components/titles/SectionTitle';
import Quiz from '@/components/quizzes/Quiz';

export default {
  name: 'RecentQuizzes',
  components: { SectionTitle, Quiz },
  computed: {
    ...mapState('Quizzes', ['quizzesRecentByUser'])
  }
}
</script>

<style lang='scss' scoped>
.recent-quizzes
{
  
}
</style>