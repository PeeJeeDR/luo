<template>
  <div class='quiz-info' v-if='quizById !== undefined'>
    <transition mode='out-in' enter-active-class='animated fadeInRight faster' leave-active-class='animated fadeOutLeft faster'>
      <div key='0' v-if='!confirmDelete'>
        <!-- Top image and QR code. -->
        <div class='img-container'>
          <transition mode='out-in' enter-active-class='animated slideInUp faster' leave-active-class='animated slideOutDown faster'>
            <img key='0' v-if='!showQR' :src='quizById.quizImg !== "" ? quizById.quizImg : require(`@/assets/img/samples/categories/${ quizById.quizSample }.jpg`)' :alt='`Header image for the "${ quizById.title } quiz."`'>

            <div @click='onQRCodeClick' id='QR-code' key='1' v-if='showQR' class='flex-center' style='height: 100%;'>
              <qrcode style='object-fit: contain' :tag='"img"' :value='quizById.id'></qrcode>
            </div>
          </transition>
        </div>
        
        <!-- Profile image and show QR code button. -->
        <div :class='`over-image flex justify-between align-center ${ showQR && "qr-is-open" }`'>
          <div>
            <transition mode='out-in' enter-active-class='animated fadeInDown faster' leave-active-class='animated fadeOut faster'>
              <profile-avatar v-if='!showQR' :user='quizUser' @click.native='onAvatarClick'/>
            </transition>
          </div>
          <button v-if='quizById.isQRQuiz && quizById.createdBy === fire.auth().currentUser.uid' @click='showQR = !showQR' class='flex-center'>
            <h2 class='heading h--m h--color-primary'>{{ !showQR ? "SHOW QR CODE" : "HIDE QR CODE" }}</h2>
          </button>
          <p 
            v-if='shouldReportRender()' 
            class='report paragraph p--weight-bold p--m p--color-almost-light p--align-center' 
            @click='onReportClick'
          >
            Report
          </p>
        </div>

        <!-- Title and stats. -->
        <div class='content'>
          <h4 class='heading h--xm'>{{ quizById.title }}</h4>
          <hr>
          <p class='paragraph p--m p--color-lighter'>{{ quizById.description }}</p>
        
          <div class='stats flex align-center'>
            <stat :title='"Questions"' :value='quizById.questions.length' :align='"center"' :color='"primary"'/>
            <stat :title='"Played"' :value='quizById.playedBy.length' :align='"center"' :color='"primary"'/>
            <stat :title='"Likes"' :value='quizById.likes' :align='"center"' :color='"primary"'/>
          </div>
        </div>

        <!-- Play, edit and delete button -->
        <div :class='`button-container flex ${ getButtonContainerClass() }`'>
          <button 
            v-ripple 
            class='play flex-center' 
            @click='playQuiz'
          >
            <h4 class='heading h--xm h--color-light'>Play quiz!</h4>
          </button>

          <button 
            v-if='fire.auth().currentUser !== null && fire.auth().currentUser.uid === quizById.createdBy' 
            v-ripple 
            class='edit flex-center' 
            @click='onEditClick'
          >
            <edit />
          </button>

          <button 
            v-if='fire.auth().currentUser !== null && fire.auth().currentUser.uid === quizById.createdBy' 
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

        <section class='flex-center direction-col'>
          <default-button :content='"Yes!"' @click.native='onYesPress'/>
          <default-button :content='"No"' @click.native='onNoPress'/>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import app from '@/settings/app.json';
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import Qrcode from '@chenfengyuan/vue-qrcode';
import Edit from '@/assets/icons/quizzes/Edit.svg';
import Trash from '@/assets/icons/quizzes/Trash.svg';
import ProfileAvatar from '@/components/avatar/ProfileAvatar';
import Stat from '@/components/utils/Stat';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'QuizInfo',
  components: { ProfileAvatar, Edit, Trash, Qrcode, Stat, DefaultButton },
  data: () => ({
    showQR: false,
    fire,
    confirmDelete: false
  }),
  computed: {
    ...mapState('Quizzes', ['quizById']),
    ...mapState('Users', ['quizUser'])
  },
  methods: {
    // When the user presses report quiz.
    onReportClick () {
      // Set quiz to be reported in the store.
      this.$store.dispatch('Reports/onReportClick', { quiz: this.quizById, question: null })
      .then(() => {
        // Open report modal.
        this.$store.dispatch('Modals/openModal', { type: 'report' });
      });
    },

    shouldReportRender () {
      if (fire.auth().currentUser) {
        let currentUserId = fire.auth().currentUser.uid;

        return this.quizById.createdBy !== currentUserId && !this.quizById.isQRQuiz && this.quizById.playedBy.includes(currentUserId);
      }

      if (!fire.auth().currentUser) {
        return false;
      }
    },

    // Get the style of the play button.
    getButtonContainerClass () {
      if (fire.auth().currentUser !== null && fire.auth().currentUser.id === this.quizById.createdBy) {
        return 'from-user';
      }

      return 'not-from-user';
    },

    // When the play button has pressed.
    playQuiz () {
      if (!this.quizById.isDeleted) {

        // Save the selected quiz in the store.
        this.$store.dispatch('PlayQuiz/onPlayButtonClick', { quiz: this.quizById }).then(() => {

          // Close info modal.
          this.$store.dispatch('Modals/closeModal');

          // Open play quiz page.
          this.$router.push('/play/quiz');
        });
      }

      if (this.quizById.isDeleted) {

        // Close info modal.
        this.$store.dispatch('Modals/closeModal');

        // Set notification.
        this.$store.dispatch('Notifications/setNotification', { 
          message: app.notifications.QUIZ_HAS_BEEN_DELETED
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
      this.$store.dispatch('CreateQuiz/onQuizEditButtonClick', { quiz: this.quizById });
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
    onYesPress () {
      // Delete quiz.
      this.$store.dispatch('Quizzes/deleteQuiz', { quiz: this.quizById })
      .then(() => {
        this.$store.dispatch('Modals/closeModal');
        this.$store.dispatch('Notifications/setNotification', { message: app.notifications.QUIZ_DELETE_SUCCESS });
      })
      .catch(() => {
        this.$store.dispatch('Notifications/setNotification', { message: app.notifications.QUIZ_DELETE_FAIL });
      });
    },

    onQRCodeClick () {
      let w = window.open();
      w.document.write(document.getElementById('QR-code').innerHTML);
      w.print();
      w.close();
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
    height: 11rem;
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

    .report {
      margin-top: 3rem;
    }
  }

  .content {
    padding: 2rem 1rem 1rem 1rem;

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