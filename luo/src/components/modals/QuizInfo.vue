<template>
  <div class='quiz-info' v-if='quizById !== undefined'>
    
    <img :src='quizById.quizImg !== "" ? quizById.quizImg : Sample' alt='Header image.'>

    <div class="info-container flex align-start">
      <profile-avatar :img='userFromDB'/>

      <div class="stats flex justify-end">
        <div class='stat'>
          <div class='flex-center'>
            <questions />
            <p class='paragraph p--m p--color-lighter'>{{ quizById.questions.length }}</p>
          </div>
        </div>
        <div class='stat'>
          <div class='flex-center'>
            <likes />
            <p class='paragraph p--m p--color-lighter'>{{ quizById.likes }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class='content'>
      <h4 class='heading h--xm'>{{ quizById.title }}</h4>
      <hr>
      <p class='paragraph p--m p--color-lighter'>{{ quizById.description }}</p>
    </div>

    <div class='flex justify-end'>
      <square-button @click.native='playQuiz' :extraClass='"enabled"'>
        <controller />
      </square-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Sample from '@/assets/img/quiz/sample.jpg';
import ProfileAvatar from '@/components/avatar/ProfileAvatar';
import Questions from '@/assets/icons/quizzes/Questions.svg';
import Likes from '@/assets/icons/quizzes/Likes.svg';
import SquareButton from '@/components/buttons/SquareButton';
import Controller from '@/assets/icons/quizzes/Controller.svg';

export default {
  name: 'QuizInfo',
  components: { ProfileAvatar, Questions, Likes, SquareButton, Controller },
  data: () => ({
    Sample
  }),
  computed: {
    ...mapState('Quizzes', ['quizById']),
    ...mapState('Users', ['userFromDB'])
  },
  methods: {
    playQuiz () {
      // Save the selected quiz in the store.
      this.$store.dispatch('PlayQuiz/onPlayButtonClick', { quiz: this.quizById }).then(() => {

        // Close info modam.
        this.$store.dispatch('Modals/closeModal');

        // Set header content.
        this.$store.dispatch('Header/onPageLoad', {
          title: '',
          leftIcon: 'close',
          rightIcon: ''
        })
      });
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz-info
{
  img {
    width: calc(100% + 4rem);
    margin-left: -2rem;
    border-bottom-left-radius: $largeRadius;
    border-bottom-right-radius: $largeRadius;
  }

  .info-container {
    width: 100%;

    .stats {
      margin-top: -1.5rem;
      width: 100%;

      .stat {
        @include subtileShadow;
        background-color: $snow;
        width: auto;
        padding: 0.5rem 1rem;
        border-radius: $smallRadius;
        display: inline-block;

        &:first-child {
          margin-right: 1rem;
        }

        svg {
          width: 1.3rem;
          margin-right: 1rem;
          fill: $pinky;
        }
      }
    }
  }

  .content {
    padding: 1.5rem 0.5rem;

    p {
      margin-top: 0.6rem;
    }
  }

  .square-button {
    margin: 0 -2rem -2.5rem 0;
    transform: scale(1.2) rotate(45deg);
  }
}
</style>