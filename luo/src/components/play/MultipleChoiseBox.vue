<template>
  <div class='multiple-choise-box big-wrapper' v-if='questions[currentQuestion] !== undefined'>
    <div class='box flex direction-col'>
      <img :src='questions[currentQuestion].questionImg !== "" ? questions[currentQuestion].questionImg : Sample' alt='Sample image'>

      <div class='content wrapper flex direction-col justify-between'>
        <question-title :currentQuestion='currentQuestion' :questions='questions'/>

        <div class='answers flex direction-col'>
          <answer-button 
            v-for='(answer, i) in questions[currentQuestion].answers' 
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
    currentQuestion: 0,
    clickedButton: undefined,
    showAnswer: false
  }),
  methods: {
    onAnswerClick (answer, clickedButton) {
      this.clickedButton = clickedButton;

/*       let question = {
        question: this.questions[this.currentQuestion].question,
        answers: this.questions[this.currentQuestion].answers
      }

      question.answers[answer.id].clicked = 'hehehe???'; */

      this.$store.dispatch('PlayQuiz/onAnswerClick', { 
        type: 'alter', 
        currentQuestion: this.currentQuestion,
        clickedAnswerId: answer.id
      })

      if (answer.correct) {
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'correct' });
      }

      if (!answer.correct) {
        this.showAnswer = true;
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'wrong' });
      }
        
      setTimeout(() => {
        this.currentQuestion += 1;
        this.clickedButton = undefined;
        this.showAnswer = false;

        if (this.currentQuestion !== this.questions.length) {
          this.$store.dispatch('PlayQuiz/onNewQuestionLoad');
        }
        
        if (this.currentQuestion === this.questions.length) {
          this.$store.dispatch('PlayQuiz/quizCompleted');
        }
      }, 1000);
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