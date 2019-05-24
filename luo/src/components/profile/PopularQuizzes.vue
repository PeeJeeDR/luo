<template>
  <div class='popular-quizzes'>
    <section-title :title='"Popular quizzes"'/>
    <quiz v-for='(quiz, i) in quizzes' :key='i' :data='quiz' :index='i'/>
  </div>
</template>

<script>
import SectionTitle from '@/components/titles/SectionTitle';
import Quiz from '@/components/quizzes/Quiz';

export default {
  name: 'PopularQuizzes',
  components: { SectionTitle, Quiz },
  props: ['quizzes']
}
</script>

<style lang='scss' scoped>
.popular-quizzes
{
  
}
</style>