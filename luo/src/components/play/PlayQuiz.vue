<template>
  <div :class='`play-quiz ${ evaluation }`'>
    
    <div v-if='!quizCompleted' class='progress'></div>

    <transition mode='out-in' enter-active-class='animated jackInTheBox ' leave-active-class='animated rotateOutUpRight faster'>
      <quiz-end key='0' v-if='quizCompleted'/>
      <multiple-choise-box key='1' v-if='showBox && !quizCompleted' :inputEnabled='inputEnabled' :questions='playingQuiz.questions'/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MultipleChoiseBox from '@/components/play/MultipleChoiseBox';
import QuizEnd from '@/components/play/QuizEnd';

export default {
  name: 'PlayQuiz',
  components: { MultipleChoiseBox, QuizEnd },
  data: () => ({ 
    showBox: false
  }),
  computed: {
    ...mapState('PlayQuiz', ['playingQuiz', 'quizCompleted', 'evaluation', 'inputEnabled'])
  },
  created () {
    setTimeout(() => {
      this.showBox = true;
    }, 600);
  }
}
</script>

<style lang='scss' scoped>
.play-quiz
{
  padding: 5.2rem 0 0 0;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 3;
  background-color: $snow;

  .progress {
    background-color: $pinky;
    height: 0%;
    position: absolute;
    bottom: 0; left: 0; right: 0;
  }
}
</style>