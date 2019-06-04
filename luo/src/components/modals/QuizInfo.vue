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
      <button v-if='quizById.isQRQuiz && quizById.createdBy === fire.auth().currentUser.uid' @click='showQR = !showQR' class='flex-center'>
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

    <div :class='`button-container flex ${ fire.auth().currentUser.uid !== quizById.createdBy && "not-from-user" }`'>
      <button 
        v-ripple 
        class='play flex-center' 
        @click='playQuiz'
      >
        <h4 class='heading h--xm h--color-light'>Play quiz!</h4>
      </button>

      <button 
        v-if='fire.auth().currentUser.uid === quizById.createdBy' 
        v-ripple 
        class='edit flex-center' 
      >
        <edit />
      </button>

      <button 
        v-if='fire.auth().currentUser.uid === quizById.createdBy' 
        v-ripple 
        class='delete flex-center' 
      >
        <trash />
      </button>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import Qrcode from '@chenfengyuan/vue-qrcode';
import Edit from '@/assets/icons/quizzes/Edit.svg';
import Trash from '@/assets/icons/quizzes/Trash.svg';
import Sample from '@/assets/img/quiz/sample.jpg';
import ProfileAvatar from '@/components/avatar/ProfileAvatar';
import Stat from '@/components/utils/Stat';

export default {
  name: 'QuizInfo',
  components: { ProfileAvatar, Edit, Trash, Qrcode, Stat },
  data: () => ({
    Sample,
    showQR: false,
    fire
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

  .button-container {
    width: calc(100% + 4rem);
    margin: 2rem 0 -2rem -2rem;

    &.not-from-user .play {
      width: 100%;
    }

    .play,
    .edit,
    .delete {
      height: 4rem;
      border: none;

      svg {
        fill: $snow;
        width: 40%;
        height: 40%;
      }
    }

    .edit,
    .delete {
      width: 20%;
    }

    .play {
      @include gradient;
      width: 60%;
    }

    .edit {
      @include gradient-safe;
    }

    .delete {
      @include gradient-danger;
    }
  }
}
</style>