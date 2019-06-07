<template>
  <div id='app'>
    <!-- NOTIFICATIONS -->
    <transition mode='out-in' enter-active-class='animated fadeIn faster' leave-active-class='animated fadeOut faster'>
      <default-notification v-if='notification !== ""'/>
    </transition>
    <!-- ========== -->

    <!-- OVERLAY THAT RENDERS WHEN MODAL IS OPEN -->
    <transition name='half-fade'>
      <div class='overlay' v-if='overlay' @click='$store.dispatch("Modals/closeModal")'></div>
    </transition>
    <!-- ========== -->

    <!-- BOTTOM NAVIGATION -->
    <transition mode='out-in' enter-active-class='animated slideInUp faster' leave-active-class='animated slideOutDown faster'>
      <bottom-navigation v-if='$route.meta.bottomNav.enabled'/>
    </transition>
    <!-- ========== -->

    <!-- MAIN HEADER -->
    <main-header v-if='$route.meta.header.enabled'/>
    <!-- ========== -->

    <!-- SIDE BAR (TOGGLED BY MAIN HEADER) -->
    <sidebar />
    <!-- ========== -->

    <!-- ALL PAGES RENDERED IN ROUTER -->
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
      <router-view/>
    </transition>
    <!-- ========== -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fire } from '@/firebase/firebase'; 
import DefaultNotification from '@/components/notifications/DefaultNotification';
import MainHeader from '@/components/header/MainHeader';
import Sidebar from '@/components/sidebar/Sidebar';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default {
  name: 'App',
  components: { DefaultNotification, MainHeader, Sidebar, BottomNavigation },
  computed: {
    ...mapState('Modals', ['overlay']),
    ...mapState('Notifications', ['notification'])
  },
  created () {
    // Set localstore session id to user that are not logged in.
    if (fire.auth().currentUser === null && !localStorage.sessionId) {
      localStorage.sessionId = [...Array(28)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    } 
  }
}
</script>

<style lang='scss' scoped>
#app {
  height: 100%;
  position: relative;

  .overlay {
    z-index: 5;
    opacity: 0.5;
    position: fixed;
    background-color: #000;
    top: 0; bottom: 0; left: 0; right: 0;
    margin-top: -10rem;
  }

  @include phone-small {
    background-color: lightcoral;
  }

  @include phone-large {
    background-color: lightblue;
  }

  @include tablet {
    background-color: lightyellow;
  }

  @include desktop-small {
    background: lightpink;
  }

  @include desktop-large {
    background-color: lightgreen;
  }
}
</style>
