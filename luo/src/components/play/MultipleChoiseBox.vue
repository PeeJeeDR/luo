<template>
  <div class='multiple-choise-box big-wrapper'>
    <div class='box flex direction-col'>
      <img :src='Sample' alt='Sample image'>

      <div class='content wrapper flex direction-col justify-between'>
        <question-title :currentQuestion='0' :questions='questions'/>

        <div class='answers flex direction-col'>
          <answer-button 
            v-for='(answer, i) in questions[0].answers' 
            :key='i' 
            :content='answer.answer' 
            :selectedAnswer='selectedAnswer'
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
    selectedAnswer: undefined
  }),
  methods: {
    onAnswerClick (answer) {
      console.log('ANSWER', answer);
      this.selectedAnswer = answer.id;

      if (answer.correct) {
        this.$store.dispatch('PlayQuiz/onCorrectAnswer');
      }

      if (!answer.correct) {
        this.$store.dispatch('PlayQuiz/onWrongAnswer');
      } 
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