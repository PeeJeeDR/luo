<template>
  <div class='quiz-end big-wrapper'>
    <div class='box flex direction-col'>

      <div class='notch flex-center'>
        <h4 class='heading h--m h--color-light'>
          Score: {{ correctAnswers }}/{{ playingQuiz.questions.length }}
        </h4>
      </div>

      <div v-if='!reviewEnabled' class='end'>
        <div class='content wrapper flex direction-col align-center'>
          <h2 v-if='correctAnswers === playingQuiz.questions.length' class='heading h--xxm h--color-primary'>Congratulations!</h2>
          <h2 v-if='correctAnswers !== playingQuiz.questions.length' class='heading h--xxm h--color-primary'>You made it!</h2>

          <div class='awards flex-center'> 
            <div class='sphere-outer'></div>
            <div class='sphere-inner'></div>

            <div class='icon flex-center'>
              <award-gold v-if='correctAnswers === playingQuiz.questions.length'/>
              <flag v-if='correctAnswers !== playingQuiz.questions.length'/>
            </div>
          </div>
        </div>
      </div>

      <div v-if='reviewEnabled' class='reviews'>
        <h1>Review</h1>
      </div>
      
      <div class='button-container'>
        <p @click='onReviewClick' class='paragraph p--weight-bold p--xm p--color-almost-light'>Review answers</p>
        <default-button :content='"continue"' @click.native='$store.dispatch("PlayQuiz/onQuizEnd")'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DefaultButton from '@/components/buttons/DefaultButton';
import AwardGold from '@/assets/icons/quizzes/AwardGold.svg';
import Flag from '@/assets/icons/quizzes/Flag.svg';

export default {
  name: 'QuizEnd',
  components: { DefaultButton, AwardGold, Flag },
  data: () => ({
    reviewEnabled: false
  }),
  computed: {
    ...mapState('PlayQuiz', ['correctAnswers', 'playingQuiz'])
  },
  methods: {
    onReviewClick () {
      this.reviewEnabled = true;
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz-end
{
  height: 100%;
  padding: 0 0 1rem 0;

  .box {
    position: relative;
  }

  .notch h4 {
    background-color: $pinky;
    padding: 0.8rem 1.2rem;
    border-bottom-left-radius: $mediumRadius;
    border-bottom-right-radius: $mediumRadius;
  }

  .end,
  .review {
    height: 40%;
  }

  .end {
    h2 {
      margin-top: 2rem;
    }

    .awards {
      position: relative;
      margin-top: 11rem;

      .sphere-outer,
      .sphere-inner {
        background-color: $pinky;
        width: 13rem;
        height: 13rem;
        position: absolute;
        border-radius: 200rem;
        opacity: 0.2;
      }

      .sphere-outer {
        width: 18rem;
        height: 18rem;
      }

      .icon {
        position: absolute;

        svg {
          width: 8rem;
          height: 8rem;
          z-index: 2;
        }
      }
    }
  }

  .button-container {
    position: fixed !important;
    bottom: 3rem;
    left: 0; right: 0;
    margin: auto;
    width: 15rem;
    text-align: center;

    p {
      margin-bottom: 1rem;
    }
  }
}
</style>