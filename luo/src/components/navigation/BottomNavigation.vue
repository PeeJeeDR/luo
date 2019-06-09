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
          <q-r :class='selectedOverview === "qr" && "active"'/>
        </div>

        <div class='icon flex-center' @click='onProfileClick'>
          <profile :class='selectedOverview === "profile" && "active"'/>
        </div>
      </div>
    </div>

    <div v-if='isOtherUser && fire.auth().currentUser' class='follow-container flex align-center'>
      <div class='item flex justify-end'>
        <div class='back-container flex-center' @click='onBackClick'>
          <back />
        </div>
      </div>

      <div class='item'>
        <default-button 
          :content='user.followers.includes(fire.auth().currentUser.uid) ? "Unfollow" : "Follow"' 
          :extraClass='user.followers.includes(fire.auth().currentUser.uid) ? "disabled" : "enabled"'
          @click.native='onFollowClick'/>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$store.dispatch('Modals/openModal', { type: 'qr' });
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
        this.$store.dispatch('Notifications/setNotification', { message: 'You need to be logged in to create quizzes.' });
      }
    },

    onBackClick () {
      this.$store.dispatch('Navigation/onBackClick');
      this.$store.dispatch('Users/onProfileDismount');
      this.$router.back();
    },

    onFollowClick () {
      if (!this.user.followers.includes(fire.auth().currentUser.uid)) {
        this.$store.dispatch('Users/onUserFollow');
      }

      if (this.user.followers.includes(fire.auth().currentUser.uid)) {
        this.$store.dispatch('Users/onUserUnFollow');
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
  width: 100%;
  padding: 0.6rem 0;
  z-index: 2;

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
    margin: 0 0.5rem;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;

    svg {
      fill: $dawn;
      width: 100%;
      height: 100%;
      transition: all $fast ease-in-out;

      &.active {
        fill: $pinky;
      }
    }
  }

  .follow-container {
    .item {
      width: 50%;
    }

    .back-container {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 9.5rem;
      border-radius: $largeRadius;

      svg {
        fill: $mist;
        width: 60%;
        height: 60%;
      }
    }

    .default-button {
      width: 15rem;
      margin-left: -7.5rem;
    }
  }
}
</style>
