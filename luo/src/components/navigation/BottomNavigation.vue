<template>
  <div class='bottom-navigation'>

    <div v-if='!isOtherUser' class='flex-center'>
      <!-- Left. -->
      <div class='icon-container flex'>
        <div class='icon flex-center' @click='onIconClick("new")'>
          <new :class='selectedOverview === "new" && "active"'/>
        </div>

        <div class='icon flex-center' @click='onIconClick("popular")'>
          <popular :class='selectedOverview === "popular" && "active"'/>
        </div>
      </div>

      <!-- Center. -->
      <square-button class='add' :extraClass='fire.auth().currentUser !== null ? "enabled add" : "disabled add"' @click.native='onAddQuizClick'>
        <h2>+</h2>
      </square-button>

      <!-- Right. -->
      <div class='icon-container flex'>
        <div class='icon flex-center' @click='onQRCodeClick'>
          <q-r :class='selectedOverview === "QR" && "active"'/>
        </div>

        <div class='icon flex-center' @click='onProfileClick'>
          <profile :class='selectedOverview === "profile" && "active"'/>
        </div>
      </div>
    </div>

    <!-- Follow container. -->
    <div v-if='isOtherUser' class='follow-container flex align-center'>
      <div class='item flex justify-end'>
        <div class='back-container flex-center' @click='onBackClick'>
          <back />
        </div>
      </div>

      <div class='item'>
        <default-button 
          v-if='fire.auth().currentUser'
          :content='user.followers !== undefined && user.followers.includes(fire.auth().currentUser.uid) ? "Unfollow" : "Follow"' 
          :extraClass='user.followers !== undefined && user.followers.includes(fire.auth().currentUser.uid) ? "disabled" : "enabled"'
          @click.native='onFollowClick'/>
      </div>
    </div>
  </div>
</template>

<script>
import app from '@/settings/app.json';
import { fire } from '@/firebase/firebase'; 
import { mapState } from 'vuex';
import SquareButton from '@/components/buttons/SquareButton';
import New from '@/assets/icons/bottom-nav/New.svg';
import Popular from '@/assets/icons/bottom-nav/Popular.svg';
import QR from '@/assets/icons/bottom-nav/QR.svg';
import Profile from '@/assets/icons/bottom-nav/Profile.svg';
import DefaultButton from '@/components/buttons/DefaultButton';
import Back from '@/assets/icons/main-header/Back.svg';

export default {
  name: 'BottomNavigation',
  components: { SquareButton, New, Popular, Profile, QR, DefaultButton, Back },
  data: () => ({ fire }),
  computed: {
    ...mapState('Navigation', ['selectedOverview']),
    ...mapState('Users', ['isOtherUser', 'user'])
  },
  methods: {
    onIconClick (selected) {
      window.scrollTo(0,0);
      this.$store.dispatch('Navigation/onIconClick', { selected });
    },

    onQRCodeClick () {
      let constraints = { audio: false, video: true };

      navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.$store.dispatch('Navigation/onQRClick');
      })
      .catch(err => {
        if (err.name=="NotAllowedError") {
          this.$store.dispatch('Notifications/setNotification', { message: app.notifications.ASK_CAMERA_ACCESS });
        }
      });
    },

    onProfileClick () {
      if (fire.auth().currentUser !== null) {
        this.$store.dispatch('Navigation/onIconClick', { selected: 'profile' })
      }

      if (fire.auth().currentUser === null) {
        this.$router.push('/authentication');
      }
    },

    onAddQuizClick () {
      if (fire.auth().currentUser !== null) {
        this.$store.dispatch('CreateQuiz/onNewQuizButtonClick').then(() => {
          this.$router.push('/quizzes/create');
        });
      }
      
      if (fire.auth().currentUser === null) {
        this.$store.dispatch('Modals/openModal', { type: 'not-logged-in' });
      }
    },

    onBackClick () {
      this.$store.dispatch('Navigation/onBackClick');
      this.$store.dispatch('Users/onProfileDismount');
      this.$router.back();
    },

    onFollowClick () {
      if (this.user.followers !== undefined) {
        if (!this.user.followers.includes(fire.auth().currentUser.uid)) {
          this.$store.dispatch('Users/onUserFollow');
        }

        if (this.user.followers.includes(fire.auth().currentUser.uid)) {
          this.$store.dispatch('Users/onUserUnFollow');
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.bottom-navigation {
  @include topShadow;
  background-color: $snow;
  bottom: 0;
  position: fixed;
  margin: auto;
  padding: 1rem;
  z-index: 2;
  width: 100%;
  max-height: 5rem;

  .add {
    width: 3rem;
    height: 3rem;
    margin: 0 1rem;

    h2 {
      transform: rotate(45deg);
      margin: -1.4rem;
      font-weight: lighter;
      font-size: 2.4rem;
    }
  }

  .icon {
    margin: 0;
    width: 5rem;

    @include phone {
      padding: 0;
      width: 50%;
    }

    svg {
      fill: $dawn;
      width: 50%;
      max-height:3rem;
      transition: all $fast ease-in-out;

      &.active {
        fill: $pinky;
      }
    }
  }

  .follow-container {
    position: relative;
    height: 2.5rem;

    @include desktop {
      width: 75%;
      margin: 0 auto;
    }

    .item {
      width: 50%;
    }

    .back-container {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      left: 1rem; top: 0; bottom: 0;
      border-radius: $largeRadius;

      @include phone {
        left: 0;
      }

      svg {
        fill: $mist;
        width: 60%;
        height: 60%;
      }
    }

    .default-button {
      width: 15rem;
      margin-left: -7.5rem;

      @include phone {
        width: 10rem;
        margin-left: -5rem;
      }
    }
  }
}
</style>
