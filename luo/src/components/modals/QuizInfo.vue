<template>
  <div class='quiz-info' v-if='quizById !== undefined'>
    <transition mode='out-in' enter-active-class='animated fadeInRight faster' leave-active-class='animated fadeOutLeft faster'>
      <div key='0' v-if='!confirmDelete'>
        <!-- Top image and QR code. -->
        <div class='img-container'>
          <transition mode='out-in' enter-active-class='animated slideInUp faster' leave-active-class='animated slideOutDown faster'>
            <img key='0' v-if='!showQR' :src='quizById.quizImg !== "" ? quizById.quizImg : Sample' :alt='`Header image for the "${ quizById.title } quiz."`'>

            <div key='1' v-if='showQR' class='flex-center' style='height: 100%;'>
              <qrcode :value='quizById.id'></qrcode>
            </div>
          </transition>
        </div>
        
        <!-- Profile image and show QR code button. -->
        <div :class='`over-image flex justify-between align-center ${ showQR && "qr-is-open" }`'>
          <div>
            <transition mode='out-in' enter-active-class='animated fadeInDown faster' leave-active-class='animated fadeOut faster'>
              <profile-avatar v-if='!showQR' :img='quizUser' @click.native='onAvatarClick'/>
            </transition>
          </div>
          <button v-if='quizById.isQRQuiz && quizById.createdBy === fire.auth().currentUser.uid' @click='showQR = !showQR' class='flex-center'>
            <h2 class='heading h--m h--color-primary'>{{ !showQR ? "SHOW QR CODE" : "HIDE QR CODE" }}</h2>
          </button>
        </div>

        <!-- Title and stats. -->
        <div class='content'>
          <h4 class='heading h--xm'>{{ quizById.title }}</h4>
          <hr>
          <p class='paragraph p--m p--color-lighter'>{{ quizById.description }}</p>
        
          <div class='stats flex align-center'>
            <stat :title='"Likes"' :value='quizById.likes' :align='"center"' :color='"primary"'/>
            <stat :title='"Questions"' :value='quizById.questions.length' :align='"center"' :color='"primary"'/>
          </div>
        </div>

        <!-- Play, edit and delete button -->
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
            @click='onEditClick'
          >
            <edit />
          </button>

          <button 
            v-if='fire.auth().currentUser.uid === quizById.createdBy' 
            v-ripple 
            class='delete flex-center' 
            @click='showDeleteConfirm'
          >
            <trash />
          </button>
        </div>
      </div>

      <!-- Confirm delete. -->
      <div key='1' v-if='confirmDelete'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Delete quiz</h3>
          <p>Are you sure you want to delete this quiz?</p>
        </section>

        <section>
          <default-button :content='"Yes!"' @click.native='onYesPress'/>
          <default-button :content='"No"' @click.native='onNoPress'/>
        </section>
      </div>
    </transition>
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
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'QuizInfo',
  components: { ProfileAvatar, Edit, Trash, Qrcode, Stat, DefaultButton },
  data: () => ({
    Sample,
    showQR: false,
    fire,
    confirmDelete: false
  }),
  computed: {
    ...mapState('Quizzes', ['quizById']),
    ...mapState('Users', ['quizUser'])
  },
  methods: {
    // When the play button has pressed.
    playQuiz () {
      if (!this.quizById.isDeleted) {
        // Save the selected quiz in the store.
        this.$store.dispatch('PlayQuiz/onPlayButtonClick', { quiz: this.quizById }).then(() => {

          // Close info modam.
          this.$store.dispatch('Modals/closeModal');

          // Open play quiz page.
          this.$router.push('/play/quiz');
        });
      }

      if (this.quizById.isDeleted) {
        // Close info modam.
        this.$store.dispatch('Modals/closeModal');

        // Set notification.
        this.$store.dispatch('Notifications/setNotification', { 
          message: 'This quiz has been deleted.' 
        });
      }
    },

    // When the users avatar is clicked.
    onAvatarClick () {
      // This will open the profile route and save the user in the Users state.
      this.$store.dispatch('Navigation/onQuizInfoAvatarClick', { user: this.quizUser });
    },

    // When the edit button has pressed.
    onEditClick () {
      // Set edit mode in CreateQuiz.
      this.$store.dispatch('CreateQuiz/onQuizEdit', { quiz: this.quizById });
    },

    // When the delete button has pressed.
    showDeleteConfirm () {
      this.confirmDelete = true;
    },

    // When the user selects No in the delete comfirmation box.
    onNoPress () {
      this.confirmDelete = false;
    },

    // When the user selects Yes in the delete comfirmation box.
    async onYesPress () {
      // Delete quiz.
      await this.$store.dispatch('Quizzes/deleteQuiz', { quiz: this.quizById });

      // Close modal.
      this.$store.dispatch('Modals/closeModal');

      // Set notification.
      this.$store.dispatch('Notifications/setNotification', { 
        message: 'Quiz removed successfully.' 
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

  .default-button:last-child {
    margin-top: 1rem;
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
        fill: $pinky;
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
      background-color: $snow;
      border: 1px solid $mr-grey;
    }

    .delete {
      background-color: $snow;
      border: 1px solid $mr-grey;
      border-left: none;
    }
  }
}
</style>