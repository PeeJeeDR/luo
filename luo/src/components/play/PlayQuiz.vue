<template>
  <div :class='`play-quiz ${ evaluation }`'>
    
    <div class='progress'></div>

    <transition mode='out-in' enter-active-class='animated jackInTheBox ' leave-active-class='animated rotateOutUpRight faster'>
      <multiple-choise-box v-if='showBox' :questions='playingQuiz.questions'/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MultipleChoiseBox from '@/components/play/MultipleChoiseBox';

export default {
  name: 'PlayQuiz',
  components: { MultipleChoiseBox },
  data: () => ({ 
    showBox: false
  }),
  computed: {
    ...mapState('PlayQuiz', ['playingQuiz', 'evaluation'])
  },
  created () {
    console.log('PLAYING QUIZ', this.playingQuiz);

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
    height: 40%;
    position: absolute;
    bottom: 0; left: 0; right: 0;
  }
}
</style>