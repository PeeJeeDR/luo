<template>
  <div class='multiple-choise' v-if='playingQuiz.questions[currentQuestion] !== undefined'>
    <div class='parent flex direction-col'>
      <transition mode='out-in' enter-active-class='animated fadeInLeft faster delay-50ms' leave-active-class='animated fadeOutLeft faster'>
        <img :key='currentQuestion' :src='playingQuiz.questions[currentQuestion].questionImg !== "" ? playingQuiz.questions[currentQuestion].questionImg : Sample' :alt='`Header image for the "${ playingQuiz.title } quiz."`'>
      </transition>

      <div class='content wrapper flex direction-col justify-between'>
        <transition mode='out-in' enter-active-class='animated fadeInLeft faster delay-100ms' leave-active-class='animated fadeOutLeft faster'>
          <question-title :key='currentQuestion' :currentQuestion='currentQuestion' :questions='playingQuiz.questions'/>
        </transition>

        <transition mode='out-in' enter-active-class='animated fadeInLeft faster delay-150ms' leave-active-class='animated fadeOutLeft faster'>
          <div :key='currentQuestion'>
            <div class='answers flex direction-col justify-end'>
              <answer-button 
                v-for='(answer, i) in playingQuiz.questions[currentQuestion].answers' 
                :key='answer.id' 
                :content='answer.answer' 
                :evaluation='returnEvaluation(i, answer.correct)'
                @click.native='inputEnabled && onAnswerClick(answer, i)'
              />
            </div>

            <p class='report paragraph p--weight-bold p--m p--color-almost-light p--align-center' @click='onReportClick'>Report</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Sample from '@/assets/img/quiz/sample.jpg';
import AnswerButton from '@/components/buttons/AnswerButton';
import QuestionTitle from '@/components/play/QuestionTitle';

export default {
  name: 'MultipleChoise',
  components: { AnswerButton, QuestionTitle },
  props: ['playingQuiz', 'inputEnabled'],
  data: () => ({ 
    Sample,
    currentQuestion: 0,
    clickedButton: undefined,
    showAnswer: false
  }),
  methods: {
    // When there is clicked on an answer.
    onAnswerClick (answer, clickedButton) {
      this.clickedButton = clickedButton;

      this.$store.dispatch('PlayQuiz/onNewQuestion', {
        currentQuestion: this.currentQuestion,
      });

      this.$store.dispatch('PlayQuiz/onAnswerClick', { 
        type: 'alter', 
        currentQuestion: this.currentQuestion,
        clickedAnswerId: answer.id
      });

      if (answer.correct) {
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'correct' });
      }

      if (!answer.correct) {
        this.showAnswer = true;
        this.$store.dispatch('PlayQuiz/onAnswerClick', { type: 'wrong' });
      }
        
      // Go to the next question after a second.
      setTimeout(() => {
        this.currentQuestion += 1;
        this.clickedButton = undefined;
        this.showAnswer = false;

        if (this.currentQuestion !== this.playingQuiz.questions.length) {
          this.$store.dispatch('PlayQuiz/onNewQuestionLoad');
        }
        
        if (this.currentQuestion === this.playingQuiz.questions.length) {
          this.$store.dispatch('PlayQuiz/quizCompleted');
        }
      }, 1000);
    },

    // Check if answer is correct or wrong.
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
    },

    // When there is clicked on the report button.
    onReportClick () {

      // Set quiz to be reported in the store.
      this.$store.dispatch('Reports/onReportClick', { quiz: this.playingQuiz, question: this.currentQuestion });

      // Open report modal.
      this.$store.dispatch('Modals/openModal', { type: 'report' });
    }
  }
}
</script>

<style lang='scss' scoped>
.multiple-choise
{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0 1rem 0;

  .parent {
    height: 100%;
  }

  .answers {
    overflow-y: scroll;
    height: 100%;
    width: calc(100% + 2rem);
    padding: 1rem 0 1.2rem 0;
    margin: -2rem 0 0 -1rem;
  }
}
</style>