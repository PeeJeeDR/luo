<template>
  <div class='recent-quizzes'>
    <section-title :title='"Recent quizzes"'/>
    <quiz v-for='(quiz, i) in getRecentQuizzesByUser' :key='i' :data='quiz' :index='i'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SectionTitle from '@/components/titles/SectionTitle';
import Quiz from '@/components/quizzes/Quiz';

export default {
  name: 'RecentQuizzes',
  components: { SectionTitle, Quiz },
  computed: {
    ...mapGetters('Quizzes', ['getRecentQuizzesByUser'])
  }
}
</script>

<style lang='scss' scoped>
.recent-quizzes
{

}
</style>