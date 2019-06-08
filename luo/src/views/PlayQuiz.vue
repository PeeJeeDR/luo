<template>
  <div class='play-quiz big-wrapper'>
    <!-- Modal for reporting questions. -->
    <transition enter-active-class='animated bounceInUp fast' leave-active-class='animated bounceOutDown fast'>
      <modal v-if='modalIsOpen'/>
    </transition>
    
    <transition mode='out-in' enter-active-class='animated jackInTheBox' leave-active-class='animated rotateOutUpRight faster'>
      <!-- === PLAYING QUIZ === -->
      <div key='0' class='box' v-if='playingQuiz !== undefined && showBox && !quizCompleted'>

        <!-- CLOSE AND PROGRESS -->
        <div class='box-header flex align-center'>
          <button v-ripple class='flex-center' @click='$router.push("/")'>
            <close />
          </button>

          <div class='progress'>
            <div class='bar flex-center' :style='getWidth()'></div>
            <div class='background'></div>
          </div>
        </div>

        <div class='big-wrapper'>
          <multiple-choise key='1' :playingQuiz='playingQuiz' :inputEnabled='inputEnabled'/>
        </div>
      </div>

      <!-- === QUIZ END === -->
      <div class='box' key='1' v-if='quizCompleted'>
        <quiz-end />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuizEnd from '@/components/play/QuizEnd';
import MultipleChoise from '@/components/play/MultipleChoise';
import Close from '@/assets/icons/main-header/Close.svg';
import Modal from '@/components/modals/Modal';

export default {
  name: 'PlayQuiz',
  components: { QuizEnd, MultipleChoise, Close, Modal },
  computed: {
    ...mapState('PlayQuiz', ['playingQuiz', 'inputEnabled', 'quizCompleted', 'currentQuestion']),
    ...mapState('Modals', ['modalIsOpen'])
  },
  data: () => ({ 
    showBox: false
  }),
  created () {
    if (this.playingQuiz === undefined) {
      this.$router.push('/');
    }

    setTimeout(() => {
      this.showBox = true;
    }, 1);
  },
  methods: {
    getWidth () {
      let currentQuestion = this.currentQuestion;
      let totalQuestions = this.playingQuiz.questions.length;

      return `width: ${ (100 / totalQuestions) * currentQuestion }%;`
    }
  }
}
</script>

<style lang='scss'>
.play-quiz
{
  height: 100%;
  padding: 0.8rem 0;

  .box {
    @include defaultShadow;
    overflow: hidden;
    height: 100%;
    width: 100%;
    border-radius: $smallRadius;

    .box-header {
      button {
        background: none;
        border: none;
        padding: 1rem;
        border-radius: 20rem;

        svg {
          width: 1rem;
          height: 1rem;
          fill: $mist;
        }
      }

      .progress {
        width: calc(100% - 4rem);
        position: relative;
        margin-bottom: -2px;

        .bar,
        .background {
          height: 0.6rem;
          border-radius: $largeRadius;
        }

        .bar {
          position: absolute;
          background-color: $pinky;
          transition: all $fast ease-in-out;
        }

        .background {
          width: 100%;
          background-color: $mr-grey;
        }
      }
    }

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
    }
  }
}
</style>