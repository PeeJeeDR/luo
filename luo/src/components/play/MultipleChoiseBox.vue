<template>
  <div class='multiple-choise-box big-wrapper' v-if='questions[currentAnswer] !== undefined'>
    <div class='box flex direction-col'>
      <img :src='Sample' alt='Sample image'>

      <div class='content wrapper flex direction-col justify-between'>
        <question-title :currentQuestion='currentAnswer' :questions='questions'/>

        <div class='answers flex direction-col'>
          <answer-button 
            v-for='answer in questions[currentAnswer].answers' 
            :key='answer.id' 
            :content='answer.answer' 
            :evaluation='returnEvaluation(answer.id)'
            @click.native='inputEnabled && onAnswerClick(answer)'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sample from '@/assets/img/quiz/sample.jpg';
import AnswerButton from '@/components/buttons/AnswerButton';
import QuestionTitle from '@/components/play/QuestionTitle';

export default {
  name: 'MultipleChoiseBox',
  components: { AnswerButton, QuestionTitle },
  props: ['questions', 'inputEnabled'],
  data: () => ({ 
    Sample,
    currentAnswer: 0,
    correctAnswerId: undefined,
    wrongAnswerId: undefined
  }),
  methods: {
    onAnswerClick (answer) {
      if (answer.correct) {
        this.correctAnswerId = answer.id;
        this.wrongAnswerId = undefined;
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'correct' });

        setTimeout(() => {
          this.currentAnswer += 1;

          if (this.currentAnswer === this.questions.length) {
            this.$store.dispatch('PlayQuiz/quizCompleted');
          }
        }, 500);
      }

      if (!answer.correct) {
        this.correctAnswerId = undefined;
        this.wrongAnswerId = answer.id;
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'wrong' });
      } 
    },

    returnEvaluation (answerId) {
      if (this.correctAnswerId === answerId) {
        return 'correct';
      }

      if (this.wrongAnswerId === answerId) {
        return 'wrong';
      }

      return 'none';
    }
  }
}
</script>

<style lang='scss' scoped>
.multiple-choise-box
{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0 1rem 0;
}
</style>