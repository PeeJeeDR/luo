<template>
  <div class='quiz-end big-wrapper'>
    <div class='box flex direction-col'>

      <div class='notch flex-center'>
        <h4 class='heading h--m h--color-light'>
          Score: {{ correctAnswers }}/{{ playingQuiz.questions.length }}
        </h4>
      </div>

      <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
        <div key='0' v-if='!reviewEnabled' class='end'>
          <div class='content wrapper flex direction-col align-center'>
            <h2 v-if='correctAnswers === playingQuiz.questions.length' class='heading h--xxm h--color-primary'>Congratulations!</h2>
            <h2 v-if='correctAnswers !== playingQuiz.questions.length' class='heading h--xxm h--color-primary'>You made it!</h2>

            <div class='award flex-center'> 
              <div class='sphere-outer'></div>
              <div class='sphere-inner'></div>

              <div class='icon flex-center'>
                <award-gold v-if='correctAnswers === playingQuiz.questions.length'/>
                <flag v-if='correctAnswers !== playingQuiz.questions.length'/>
              </div>
            </div>

            <div 
              v-if='fire.auth().currentUser !== null'
              @click='onLikeClick' 
              :class='`likes flex-center ${ likeClass } ${ animateLikeButton && likeClass === "selected" && "animated bounceIn fast" }`' 
              @animationend='animateLikeButton = false'
            >
              <likes />
            </div>
          </div>
        </div>

        <div v-if='reviewEnabled' key='1' class='review'>
          <review-answers :quiz='playingQuiz'/>
        </div>
      </transition>
      
      <div class='button-container'>
        <p v-if='!reviewEnabled' @click='onReviewClick' class='paragraph p--weight-bold p--xm p--color-almost-light'>Review answers</p>
        <p v-if='reviewEnabled' @click='onBackClick' class='paragraph p--weight-bold p--xm p--color-almost-light'>Back</p>
        <default-button :content='"continue"' @click.native='$store.dispatch("PlayQuiz/onQuizEnd")'/>
      </div>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import ReviewAnswers from '@/components/play/ReviewAnswers';
import DefaultButton from '@/components/buttons/DefaultButton';
import AwardGold from '@/assets/icons/quizzes/AwardGold.svg';
import Likes from '@/assets/icons/quizzes/Likes.svg';
import Flag from '@/assets/icons/quizzes/Flag.svg';

export default {
  name: 'QuizEnd',
  components: { ReviewAnswers, DefaultButton, AwardGold, Likes, Flag },
  data: () => ({
    fire,
    reviewEnabled: false,
    likeClass: 'unselected',
    animateLikeButton: false
  }),
  computed: {
    ...mapState('PlayQuiz', ['correctAnswers', 'playingQuiz'])
  },
  created () {
    this.checkLikeStatus();
  },
  methods: {
    onReviewClick () {
      this.reviewEnabled = true;
    },

    onBackClick () {
      this.reviewEnabled = false;
    },

    onLikeClick () {
      if (this.likeClass === 'unselected') {
        this.$store.dispatch('Quizzes/likeQuiz', { 
          quiz: this.playingQuiz,
          id: fire.auth().currentUser.uid
        });
      }

      if (this.likeClass === 'selected') {
        this.$store.dispatch('Quizzes/unlikeQuiz', { 
          quiz: this.playingQuiz,
          id: fire.auth().currentUser.uid
        });
      }

      this.animateLikeButton = true;
      this.likeClass = this.likeClass === 'unselected' ? 'selected' : 'unselected';
    },

    checkLikeStatus () {
      if (this.playingQuiz.likedBy.includes(fire.auth().currentUser.uid)) {
        this.likeClass = 'selected';
      }

      if (!this.playingQuiz.likedBy.includes(fire.auth().currentUser.uid)) {
        this.likeClass = 'unselected';
      }
    }
  },
  watch: {
    playingQuiz () {
      this.checkLikeStatus();
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
    overflow: scroll;
  }

  .end {
    height: 75%;

    h2 {
      margin-top: 2rem;
    }

    .award {
      position: relative;
      margin-top: 10rem;

      .sphere-outer,
      .sphere-inner {
        background-color: $pinky;
        width: 11rem;
        height: 11rem;
        position: absolute;
        border-radius: 200rem;
        opacity: 0.15;
      }

      .sphere-outer {
        width: 16rem;
        height: 16rem;
      }

      .icon {
        position: absolute;

        svg {
          width: 6rem;
          height: 6rem;
          z-index: 2;
        }
      }
    }

    .likes {
      margin-top: 10rem;
      padding: 0.8rem;
      border: 2px solid;
      border-radius: 200rem;

      svg {
        width: 1.8rem;
        height: 1.8rem;
      }

      &.unselected {
        border-color: $pinky;

        svg {
          fill: $pinky;
        }
      }

      &.selected {
        background-color: $pinky;
        border-color: $pinky;

        svg {
          fill: $snow;
        }
      }
    }
  }

  .review {
    height: 70%;
    margin-top: 5%;
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