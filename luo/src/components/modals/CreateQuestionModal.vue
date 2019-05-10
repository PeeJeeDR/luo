<template>
  <div class='create-question-modal default-modal'>
    <h3 class='heading h--xxm h--color-primary'>Question 1</h3>

    <form @submit.prevent='onFormSubmit'>
      <input type='text' class='default-input' placeholder='Question title'  v-model='question'>

      <div class='answers'>
        <!-- === SINGLE ANSWER === -->
        <div class='answer flex align-center' v-for='(answer, i) in answers' :key='i'>
          <check-mark @click.native='setCorrect(i)' :checked='answer.correct'/>
          <input v-model='answer.answer' type='text' class='default-input' :placeholder='`Answer ${ i }`'>
        </div>
        <!-- ========== -->

        <h2 class='heading h--m h--align-center h--color-primary' @click='addAnswer' v-if='answers.length < 4'>Add answer</h2>
      </div>

      <submit-and-cancel @oncancel='$store.dispatch("Modals/closeModals")'/>
    </form>
  </div>
</template>

<script>
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  name: 'CreateQuestionModal',
  components: { CheckMark, SubmitAndCancel },
  data: () => ({
    nbrOfAnswers: 1,
    selectedAnswer: 0,
    question: '',
    answers: []
  }),
  beforeDestroy () {
    this.$store.dispatch('Modals/closeModals');
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

      this.$store.dispatch('Modals/closeModals');
    }
  },
  computed: {
    
  }
}
</script>

<style lang='scss' scoped>
.create-question-modal .answers {
  padding: 1rem 0;
  width: 100%;

  .answer {
    margin-bottom: 1rem;

    &:last-child {
      margin: 0;
    }

    input {
      margin: 0;
    }
  }
}
</style>
