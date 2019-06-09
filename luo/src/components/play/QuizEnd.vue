<template>
  <div class='quiz-end'>
    
    <div class='notch flex-center'>
      <h4 class='heading h--m h--color-light'>
        Score: {{ correctAnswers }}/{{ playingQuiz.questions.length }}
      </h4>
    </div>

    <div class='container flex direction-col justify-between'>
      <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
        <!-- === TITLE, SVG AND LIKE BUTTON === -->
        <div key='0' v-if='!reviewEnabled' class='title-svg-and-like flex direction-col align-center justify-center'>
          <!-- === TITLE === -->
          <div>
            <h2 v-if='correctAnswers === playingQuiz.questions.length' class='heading h--xxm h--color-primary'>Congratulations!</h2>
            <h2 v-if='correctAnswers !== playingQuiz.questions.length' class='heading h--xxm h--color-primary'>You made it!</h2>
          </div>

          <!-- === SVG === -->
          <div class='award flex-center'>
            <div class='sphere-outer'></div>
            <div class='sphere-inner'></div>

            <div class='icon flex-center'>
              <award-gold v-if='correctAnswers === playingQuiz.questions.length'/>
              <flag v-if='correctAnswers !== playingQuiz.questions.length'/>
            </div>
          </div>

          <!-- === LIKE BUTTON === -->
          <div 
            :class='`likes flex-center ${ likeClass } ${ animateLikeButton && likeClass === "selected" && "animated bounceIn fast" }`' 
            v-if='fire.auth().currentUser !== null && fire.auth().currentUser.uid !== playingQuiz.createdBy'
            @click='onLikeClick' 
            @animationend='animateLikeButton = false'
          >
            <likes />
          </div>
        </div>

        <!-- === REVIEW SCREEN === -->
        <div key='1' v-if='reviewEnabled' class='review flex align-start'>
          <review-answers :quiz='playingQuiz'/>
        </div>
      </transition>
    

      <!-- === BUTTON CONTAINER === -->
      <div class='button-container flex direction-col align-center '>
        <p v-if='!reviewEnabled' @click='onReviewClick' class='small-button paragraph p--weight-bold p--xm p--color-almost-light'>Review answers</p>
        <p v-if='reviewEnabled' @click='onBackClick' class='small-button paragraph p--weight-bold p--xm p--color-almost-light'>Back</p>
        <default-button :content='"continue"' @click.native='onContinueClick'/>
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
      if (fire.auth().currentUser) {
        if (this.playingQuiz.likedBy.includes(fire.auth().currentUser.uid)) {
          this.likeClass = 'selected';
        }

        if (!this.playingQuiz.likedBy.includes(fire.auth().currentUser.uid)) {
          this.likeClass = 'unselected';
        }
      }
    },

    async onContinueClick () {
      await this.$store.dispatch('PlayQuiz/onQuizEnd');
      this.$router.back();
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

  .notch h4 {
    background-color: $pinky;
    padding: 0.8rem 1.2rem;
    border-bottom-left-radius: $mediumRadius;
    border-bottom-right-radius: $mediumRadius;
  }

  .container {
    height: calc(100% - 3rem);
    padding: 3rem 0;
  }

  .title-svg-and-like {
    .award {
      position: relative;
      margin-top: 10rem;
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
        width: 16rem; 
        height: 16rem;
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
      margin-top: 11rem;
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
}
</style>