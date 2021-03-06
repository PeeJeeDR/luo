<template>
  <div class='multiple-choise' v-if='playingQuiz.questions[currentQuestion] !== undefined'>
    <div class='parent flex direction-col'>
      <transition mode='out-in' enter-active-class='animated fadeInLeft faster delay-50ms' leave-active-class='animated fadeOutLeft faster'>
        <div 
          :key='currentQuestion'
          @click='expand = !expand' :class='`img-container ${ expand && "expanded" }`'
          v-if='playingQuiz.questions[currentQuestion].questionImg !== ""'
        >
          <img :src='playingQuiz.questions[currentQuestion].questionImg' :alt='`Header image for the "${ playingQuiz.title } quiz."`'>
          <div class='expand flex-center'><expand /></div>
        </div>
      </transition>

      <div class='content flex direction-col justify-between'>
        <transition mode='out-in' enter-active-class='animated fadeInLeft faster delay-100ms' leave-active-class='animated fadeOutLeft faster'>
          <div :key='currentQuestion' class='title-audio flex'>
            <audio-button v-if='audioFile' :file='audioFile' :autoPlay='true' :isAudioFile='true'/>
            <question-title :currentQuestion='currentQuestion' :questions='playingQuiz.questions'/>
          </div>
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
import clonedeep from 'lodash.clonedeep';
import AnswerButton from '@/components/buttons/AnswerButton';
import QuestionTitle from '@/components/play/QuestionTitle';
import Expand from '@/assets/icons/quizzes/Expand.svg';
import Correct from '@/assets/sound/Correct.mp3';
import Wrong from '@/assets/sound/Wrong.mp3';
import AudioButton from '@/components/buttons/AudioButton.vue';

export default {
  name: 'MultipleChoise',
  components: { AnswerButton, QuestionTitle, Expand, AudioButton },
  props: ['playingQuiz', 'inputEnabled'],
  data: () => ({ 
    currentQuestion: 0,
    clickedButton: undefined,
    showAnswer: false,
    expand: false,
    audioFileCorrect: new Audio(Correct),
    audioFileWrong: new Audio(Wrong),
    audioFile: undefined,
  }),
  created () {
    this.setAudioFile();
    this.audioFileCorrect.volume = 0.2;
    this.expand = false;
  },
  beforeDestroy () {
    this.removeAudio();
  },
  methods: {
    setAudioFile () {
      if (this.playingQuiz.questions[this.currentQuestion].questionAudio !== '') {
        this.audioFile = new Audio(this.playingQuiz.questions[this.currentQuestion].questionAudio);
      }
    },

    removeAudio () {
      if (this.audioFile) {
        this.audioFile.pause();
        this.audioFile.currentTime = 0;
        this.audioFile = undefined;
      }
    },

    // When there is clicked on an answer.
    onAnswerClick (answer, clickedButton) {
      this.removeAudio();

      this.clickedButton = clickedButton;

      let questionCopy = clonedeep(this.playingQuiz.questions[this.currentQuestion]);
      questionCopy.answers[clickedButton].clicked = true;

      this.$store.dispatch('PlayQuiz/pushQuestionToReviews', { question: questionCopy });
      this.$store.commit('PlayQuiz/SET_CURRENT_QUESTION', this.currentQuestion);

      if (answer.correct) {
        this.audioFileCorrect.play();
      }

      if (!answer.correct) {
        this.audioFileWrong.play();
        this.showAnswer = true;
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
  },
  watch: {
    currentQuestion () {
      this.expand = false;
      this.setAudioFile();
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

  .title-audio {
    z-index: 2;

    button {
      margin-right: 1.5rem;
    }
  }

  .answers {
    overflow-y: scroll;
    height: 100%;
    width: calc(100% + 2rem);
    padding: 5rem 0 1.2rem 0;
    margin: -2rem 0 0 -1rem;
  }
}
</style>