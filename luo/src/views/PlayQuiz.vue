<template>
  <div class='play-quiz big-wrapper flex-center'>
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

        <div class='game-container'>
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

  @include desktop {
    width: 50rem !important;
  }

  .box {
    @include defaultShadow;
    height: 100%;
    width: 100%;
    border-radius: $smallRadius;
    overflow: hidden;

    @include tablet {
      height: 90%;
    }

    @include desktop {
      height: 85%;
    }

    .game-container {
      height: 100%;
    }

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

    .img-container {
      position: relative;

      &.expanded {
        img {
          height: 40vh !important;
        }
      }

      img {
        width: 100%;
        object-fit: cover;
        border-bottom-left-radius: $largeRadius;
        border-bottom-right-radius: $largeRadius;
        transition: $quarty;

        @include phone {
          height: 20vh;
        }

        @include tablet {
          height: 25rem;
        }
        
        @include desktop {
          height: 25rem;
        }
      }

      .expand {
        border-radius: 20rem;
        width: 3rem;
        height: 3rem;
        position: absolute;
        bottom: 10px; right: 5px;
        background-color: #000;
        z-index: 3;
        opacity: 0.6;

        svg {
          fill: $snow;
          width: 50%;
          height: 50%;
        }
      }
    }

    .content {
      width: 100%;
      height: 100%;
      padding: 2rem;
      overflow: scroll;

      .audio-play-button {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
        border-radius: 20rem;
        flex: 0 0 3rem;
        
        &.paused {
          border: 2px solid $pinky;

          svg { fill: $pinky; }
        }

        &.playing {
          background-color: $pinky;

          svg { fill: $snow; }
        }

        svg {
          width: 50%;
          height: 50%;
          transition: all 100ms ease-in-out;
        }

        &:hover {
          cursor: pointer;

          svg {
            transform: scale(0.9);
          }
        }
      }
    }
  }
}
</style>