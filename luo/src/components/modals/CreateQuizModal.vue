<template>
  <div class='create-quiz-modal'>
    <medium-heading :color='"primary"'>Question 1</medium-heading>

    <form @submit.prevent='onFormSubmit' class='flex direction-col align-end'>
      <input type='text' class='default-input' placeholder='Question title'  v-model='question'>

      <div class='answers'>
        <!-- === SINGLE ANSWER === -->
        <div class='answer flex align-center' v-for='(answer, i) in answers' :key='i'>
          <div @click='setCorrect(i)' :class='`check flex-center ${ answer.correct ? "active" : "not-active" }`'><check /></div>
          <input v-model='answer.answer' type='text' class='default-input' :placeholder='`Answer ${ i }`'>
        </div>
        <!-- ========== -->

        <p @click='addAnswer' v-if='answers.length < 4'>Add answer</p>
      </div>

      <submit-and-cancel @oncancel='$store.dispatch("Modals/closeModal")'/>
    </form>
  </div>
</template>

<script>
import Check from '@/assets/icons/quizzes/Check.svg';
import MediumHeading from '@/components/headings/MediumHeading';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  name: 'CreateQuizModal',
  components: { MediumHeading, Check, SubmitAndCancel },
  data: () => ({
    nbrOfAnswers: 1,
    selectedAnswer: 0,
    question: '',
    answers: []
  }),
  beforeDestroy () {
    this.$store.dispatch('Modals/closeModal');
  },
  methods: {
    addAnswer () {
      this.answers.push({
        id: this.answers.length,
        answer: '',
        correct: false,
        type: 'text'
      });
    },

    setCorrect (i) {
      this.answers.map(answer => answer.correct = false);
      this.answers[i].correct = true;
    },

    onFormSubmit () {
      this.$store.dispatch('CreateQuiz/onQuestionFormSubmit', {
        question: this.question,
        answers: this.answers
      });

      this.$store.dispatch('Modals/closeModal');
    }
  },
  computed: {
    
  }
}
</script>

<style lang='scss' scoped>
.create-quiz-modal {
  position: absolute;
  background-color: $snow;
  width: 100%;
  z-index: 5;
  border-radius: $smallRadius;
  padding: 2rem;
  overflow: hidden;

  form {
    padding-top: 1rem;
  }

  .answers {
    padding: 1rem 0;
    width: 100%;

    .answer {
      margin-bottom: 1rem;

      &:last-child {
        margin: 0;
      }

      .check {
        flex: 0 0 2rem;
        width: 2rem;
        height: 2rem;
        margin: 0 1rem 0 0;
        border-radius: 4rem;

        &.active {
          background-color: $pinky;
        }

        &.not-active {
          background-color: $mist;
        }

        svg {
          fill: $snow;
          transform: scale(0.35);
          position: absolute;
        }
      }

      input {
        margin: 0;
      }
    }
  }
}
</style>
