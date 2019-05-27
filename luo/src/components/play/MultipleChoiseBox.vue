<template>
  <div class='multiple-choise-box big-wrapper'>
    <div class='box flex direction-col'>
      <img :src='Sample' alt='Sample image'>

      <div class='content wrapper flex direction-col justify-between'>
        <question-title :currentQuestion='0' :questions='questions'/>

        <div class='answers flex direction-col'>
          <answer-button 
            v-for='answer in questions[0].answers' 
            :key='answer.id' 
            :content='answer.answer' 
            :evaluation='returnEvaluation(answer.id)'
            @click.native='onAnswerClick(answer)'
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
  props: ['questions'],
  components: { AnswerButton, QuestionTitle },
  data: () => ({ 
    Sample,
    correctAnswerId: undefined,
    wrongAnswerId: undefined
  }),
  methods: {
    onAnswerClick (answer) {
      console.log('ANSWER', answer);

      if (answer.correct) {
        this.correctAnswerId = answer.id;
        this.wrongAnswerId = undefined;
        this.$store.dispatch('PlayQuiz/onCorrectAnswer');
      }

      if (!answer.correct) {
        this.correctAnswerId = undefined;
        this.wrongAnswerId = answer.id;
        this.$store.dispatch('PlayQuiz/onWrongAnswer');
      } 
    },

    returnEvaluation (answerId) {
      console.log('EXE');

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

  .box {
    @include defaultShadow;
    overflow: hidden;
    background-color: $snow;
    height: 100%;
    width: 100%;
    border-radius: $smallRadius;

    img {
      width: 100%;
      height: 12rem;
      object-fit: cover;
      border-bottom-left-radius: $largeRadius;
      border-bottom-right-radius: $largeRadius;
    }

    .content {
      padding: 1rem 0 2rem 0;
      height: 100%;

      .answers {

      }
    }
  }
}
</style>