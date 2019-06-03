<template>
  <div class='quiz-info' v-if='quizById !== undefined'>
    <div class='img-container'>
      <transition mode='out-in' enter-active-class='animated slideInUp faster' leave-active-class='animated slideOutDown faster'>
        <img key='0' v-if='!showQR' :src='quizById.quizImg !== "" ? quizById.quizImg : Sample' :alt='`Header image for the "${ quizById.title } quiz."`'>

        <div key='1' v-if='showQR' class='flex-center' style='height: 100%;'>
          <qrcode :value='quizById.id'></qrcode>
        </div>
      </transition>
    </div>
    
    

    <div :class='`over-image flex justify-between align-center ${ showQR && "qr-is-open" }`'>
      <div>
        <profile-avatar v-if='!showQR' :img='userFromDB'/>
      </div>
      <button @click='showQR = !showQR' class='flex-center'>
        <h2 class='heading h--m h--color-primary'>{{ !showQR ? "SHOW QR CODE" : "HIDE QR CODE" }}</h2>
      </button>
    </div>

    <div class='content'>
      <h4 class='heading h--xm'>{{ quizById.title }}</h4>
      <hr>
      <p class='paragraph p--m p--color-lighter'>{{ quizById.description }}</p>
    
      <div class='stats flex align-center'>
        <stat :title='"Likes"' :value='quizById.likes' :align='"center"' :color='"primary"'/>
        <stat :title='"Questions"' :value='quizById.questions.length' :align='"center"' :color='"primary"'/>
      </div>
    </div>

    <button v-ripple class='play flex-center' @click='playQuiz'>
      <h4 class='heading h--xm h--color-light'>Play quiz!</h4>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Qrcode from '@chenfengyuan/vue-qrcode';
import Sample from '@/assets/img/quiz/sample.jpg';
import ProfileAvatar from '@/components/avatar/ProfileAvatar';
import Stat from '@/components/utils/Stat';

export default {
  name: 'QuizInfo',
  components: { ProfileAvatar, Qrcode, Stat },
  data: () => ({
    Sample,
    showQR: false
  }),
  computed: {
    ...mapState('Quizzes', ['quizById']),
    ...mapState('Users', ['userFromDB'])
  },
  created () {
    setTimeout(() => {
      this.animatePlay = true;
    }, 250)
  },
  methods: {
    playQuiz () {
      // Save the selected quiz in the store.
      this.$store.dispatch('PlayQuiz/onPlayButtonClick', { quiz: this.quizById }).then(() => {

        // Close info modam.
        this.$store.dispatch('Modals/closeModal');

        // Open play quiz page.
        this.$router.push('/play/quiz');
      });
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz-info
{
  .profile-avatar {
    width: 0;
  }

  .img-container {
    @include subtileShadow;
    height: 10rem;
    margin-left: -2rem;
    width: calc(100% + 4rem);
    border-bottom-left-radius: $largeRadius;
    border-bottom-right-radius: $largeRadius;
    overflow: hidden;

    img {
      height: 100%;
    }
  }

  .over-image {
    margin-top: -3rem;
    width: 100%;
    height: 5.5rem;

    button {
      padding: 1rem;
      margin: -0.5rem -1rem -3.5rem 0;
      border-radius: $smallRadius;
      background: none;
      border: none;
      justify-self: flex-end;
    }

    .qr-container {
      @include subtileShadow;
      padding: 0.5rem;
      overflow: hidden;
      background-color: $snow;
      border-radius: 25rem;
    }
  }

  .content {
    padding: 0.5rem;

    p {
      margin-top: 0.6rem;
    }

    .stats {
      margin-top: 1.5rem;

      .stat {
        margin-right: 2rem;
      }
    }
  }

  .play {
    @include gradient;
    width: calc(100% + 4rem);
    height: 4rem;
    margin: 1rem 0 -2rem -2rem;
    border: none;
  }
}
</style>