<template>
  <div class='review-answers wrapper'>
    <ul>
      <li v-for='(question, i) in quiz.questions' :class='`question ${ returnQuestionClass(question.answers) }`'>
        <h3 class='heading h--xm h--weight-bold'>
          {{ i + 1 }}. {{ question.question }}
        </h3>

        <ul class='answers'>
          <li v-for='answer in question.answers'>
            <p :class='`paragraph p--m ${ returnAnswerClass(answer) }`'>
              {{ answer.answer }} {{ answer.clicked && "(your answer)" }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ReviewAnswers',
  props: ['quiz'],
  methods: {
    returnQuestionClass (answers) {
      let styleClass = undefined;

      answers.forEach(answer => {
        if (answer.clicked && answer.correct) {
          styleClass = 'correct';
        }

        if (answer.clicked && !answer.correct) {
          styleClass = 'wrong';
        }
      });

      return styleClass !== undefined ? styleClass : '';
    },

    returnAnswerClass (answer) {
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
  ol {
    list-style-position: inside;
  }

  .question {
    margin-top: 2rem;
    padding: 1rem;
    border-radius: $smallRadius;

    &.correct {
      background-color: rgba($yeah, 0.2);

      h3 {
        color: $yeah;
      }
    }

    &.wrong {
      background-color: rgba($auwch, 0.2);

      h3 {
        color: $auwch;
      }
    }

    &:first-child {
      margin: 0;
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