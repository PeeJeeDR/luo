<template>
  <div class='review-answers'>
    <ul>
      <li v-for='(review, i) in reviews' class='question'>
        <h3 class='heading h--xm h--weight-bold'>
          {{ i + 1 }}. {{ review.question }}
        </h3>

        <ul class='answers'>
          <li v-for='(answer, i) in review.answers'>
            <p :class='`paragraph p--m ${ returnAnswerClass(answer, i) }`'>
              {{ answer.answer }} {{ answer.clicked && "(your answer)" }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ReviewAnswers',
  props: ['quiz'],
  computed: {
    ...mapState('PlayQuiz', ['reviews'])
  },
  methods: {
    returnAnswerClass (answer, i) {
      let styleClass = undefined;

      if (answer.clicked) {
        styleClass += ' p--weight-bold';
      }

      if (answer.clicked && answer.correct) {
        styleClass += ' p--color-yeah';
      }

      if (answer.clicked && !answer.correct) {
        styleClass += ' p--color-danger';
      }

      if (!answer.clicked && answer.correct) {
        styleClass += ' p--color-yeah p--weight-bold';
      }

      return styleClass !== undefined ? styleClass : '';
    }
  }
}
</script>

<style lang='scss' scoped>
.review-answers
{
  height: 95%;
  overflow: scroll;
  padding: 2rem 3rem;
  width: 100%;

  .question {
    padding: 1rem 0;
    border-radius: $smallRadius;

    h3 {
      color: $texty;
    }

    &:first-child {
      margin: 0;
      padding-top: 0;
    }

    .answers {
      margin-top: 0.5rem;

      li {
        margin-top: 0.3rem;
      }
    }
  }
}
</style>