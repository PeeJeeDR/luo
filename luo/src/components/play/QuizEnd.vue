<template>
  <div class='quiz-end'>
    
    <score-notch />

    <div class='container flex direction-col justify-between'>
      <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
        <!-- Title, svg and like button. -->
        <div key='0' v-if='!reviewEnabled' class='title-svg-and-like flex direction-col align-center justify-start'>
          <!-- Title. -->
          <div>
            <h2 v-if='correctAnswers === playingQuiz.questions.length' class='heading h--xxm h--color-primary'>Congratulations!</h2>
            <h2 v-if='correctAnswers !== playingQuiz.questions.length' class='heading h--xxm h--color-primary'>You made it!</h2>
          </div>

          <!-- Svg. -->
          <div class='award flex-center'>
            <div class='sphere-outer'></div>
            <div class='sphere-inner'></div>

            <div class='icon flex-center'>
              <award-gold v-if='getScore === reviews.length'/>
              <flag v-else/>
            </div>
          </div>

          <!-- Like button. -->
          <div 
            :class='`likes flex-center ${ likeClass } ${ animateLikeButton && likeClass === "selected" && "animated bounceIn fast" }`' 
            v-if='fire.auth().currentUser !== null && fire.auth().currentUser.uid !== playingQuiz.createdBy'
            @click='onLikeClick' 
            @animationend='animateLikeButton = false'
          >
            <likes />
          </div>
        </div>

        <!-- Review screen. -->
        <div key='1' v-if='reviewEnabled' class='review flex align-start'>
          <review-answers />
        </div>
      </transition>
    

      <!-- Button container. -->
      <div class='button-container flex direction-col align-center justify-end'>
        <p v-if='!reviewEnabled' @click='onReviewClick' class='small-button paragraph p--weight-bold p--xm p--color-almost-light'>Review answers</p>
        <p v-if='reviewEnabled' @click='onBackClick' class='small-button paragraph p--weight-bold p--xm p--color-almost-light'>Back</p>
        <default-button :content='"continue"' @click.native='onContinueClick'/>
      </div>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState, mapGetters } from 'vuex';
import ScoreNotch from '@/components/play/ScoreNotch';
import ReviewAnswers from '@/components/play/ReviewAnswers';
import DefaultButton from '@/components/buttons/DefaultButton';
import AwardGold from '@/assets/icons/quizzes/AwardGold.svg';
import Likes from '@/assets/icons/quizzes/Likes.svg';
import Flag from '@/assets/icons/quizzes/Flag.svg';
import QuizEnd from '@/assets/sound/QuizEnd.mp3';

export default {
  name: 'QuizEnd',
  components: { ScoreNotch, ReviewAnswers, DefaultButton, AwardGold, Likes, Flag },
  data: () => ({
    fire,
    reviewEnabled: false,
    likeClass: 'unselected',
    animateLikeButton: false,
    quizEndSound: new Audio(QuizEnd)
  }),
  computed: {
    ...mapState('PlayQuiz', ['correctAnswers', 'playingQuiz', 'reviews']),
    ...mapGetters('PlayQuiz', ['getScore']),
  },
  created () {
    this.checkLikeStatus();

    if (this.getScore === this.reviews.length) {
      this.quizEndSound.volume = 0.2;
      this.quizEndSound.play();
    }
  },
  beforeDestroy () {
    this.quizEndSound.pause();
    this.quizEndSound.currentTime = 0;
    this.quizEndSound = undefined;
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
      if (fire.auth().currentUser) {
        if (this.playingQuiz.likedBy.includes(fire.auth().currentUser.uid)) {
          this.likeClass = 'selected';
        }

        if (!this.playingQuiz.likedBy.includes(fire.auth().currentUser.uid)) {
          this.likeClass = 'unselected';
        }
      }
    },

    onContinueClick () {
      this.$store.dispatch('PlayQuiz/onQuizEnd')
      .then(() => {
        this.$router.back();
      });
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

  .container {
    height: calc(100% - 3rem);
    padding: 3rem 0;
  }

  .title-svg-and-like {
    height: 80%;
    overflow: scroll;
    
    .award {
      position: relative;
      margin-top: 9rem;
      width: 100%;

      .sphere-outer,
      .sphere-inner {
        background-color: $pinky;
        width: 11rem; 
        height: 11rem;
        position: absolute;
        border-radius: 20rem;
        opacity: 0.15;
      }

      .sphere-outer {
        width: 15rem; 
        height: 15rem;
      }

      .icon {
        position: absolute;

        svg {
          width: 6rem;
          height: 6rem;
        }
      }
    }

    .likes {
      margin-top: 10rem;
      margin-bottom: 2rem;
      padding: 0.8rem;
      border: 2px solid;
      border-radius: 20rem;

      svg {
        width: 1.8rem; 
        height: 1.8rem;
      }

      &:hover {
        cursor: pointer;
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

  .button-container {
    width: 15rem;
    margin: 0 auto;
    height: 20%;

    p {
      margin-bottom: 1.3rem;
    }
  }

  .small-button {
    padding: 0.8rem 1.2rem;
    border-radius: $smallRadius;
  }
  .small-button:hover {
    background-color: lighten($mr-grey, 5%);
    cursor: pointer;
  }
  .small-button:focus {
    background-color: red !important;
  }
}
</style>