<template>
  <div class='multiple-choise-box big-wrapper' v-if='questions[currentAnswer] !== undefined'>
    <div class='box flex direction-col'>
      <img :src='Sample' alt='Sample image'>

      <div class='content wrapper flex direction-col justify-between'>
        <question-title :currentQuestion='currentAnswer' :questions='questions'/>

        <div class='answers flex direction-col'>
          <answer-button 
            v-for='(answer, i) in questions[currentAnswer].answers' 
            :key='answer.id' 
            :content='answer.answer' 
            :evaluation='returnEvaluation(i, answer.correct)'
            @click.native='inputEnabled && onAnswerClick(answer, i)'
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
    clickedButton: undefined,
    showAnswer: false
  }),
  methods: {
    onAnswerClick (answer, clickedButton) {
      this.clickedButton = clickedButton;

      if (answer.correct) {
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'correct' });
      }

      if (!answer.correct) {
        this.showAnswer = true;
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'wrong' });
      }
        
      setTimeout(() => {
        this.currentAnswer += 1;
        this.clickedButton = undefined;
        this.showAnswer = false;

        if (this.currentAnswer !== this.questions.length) {
          this.$store.dispatch('PlayQuiz/onNewQuestionLoad');
        }
        
        if (this.currentAnswer === this.questions.length) {
          this.$store.dispatch('PlayQuiz/quizCompleted');
        }
      }, 700);
    },

    returnEvaluation (buttonId, answerCorrect) {
      if (buttonId === this.clickedButton && answerCorrect) {
        return 'correct';
      }

      if (buttonId === this.clickedButton && !answerCorrect) {
        return 'wrong';
      }

      if (answerCorrect && this.showAnswer) {
        return 'correct';
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