<template>
  <div id='app'>
    <!-- OVERLAY THAT RENDERS WHEN MODAL IS OPEN -->
    <transition name='fade-overlay'>
      <div class='overlay' v-if='overlay' @click='$store.dispatch("Modals/closeModals")'></div>
    </transition>

    <!-- BOTTOM NAVIGATION -->
    <transition mode='out-in' enter-active-class='animated slideInUp faster' leave-active-class='animated slideOutDown faster'>
      <bottom-navigation v-if='$route.meta.bottomNav.enabled'/>
    </transition>

    <!-- MAIN HEADER -->
    <main-header v-if='$route.meta.header.enabled'/>

    <!-- SIDE BAR (TOGGLED BY MAIN HEADER) -->
    <sidebar />

    <!-- ALL PAGES RENDERED IN ROUTER -->
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fire } from '@/firebase/firebase'; 
import MainHeader from '@/components/header/MainHeader';
import Sidebar from '@/components/sidebar/Sidebar';
import BottomNavigation from '@/components/navigation/BottomNavigation';

export default {
  name: 'App',
  components: { MainHeader, Sidebar, BottomNavigation },
  computed: {
    ...mapState('Modals', ['overlay'])
  }
}
</script>

<style lang='scss' scoped>
#app {
  height: 100%;
  position: relative;

  .overlay {
    z-index: 3;
    opacity: 0.5;
    position: fixed;
    background-color: #000;
    top: 0; bottom: 0; left: 0; right: 0;
    margin-top: -10rem;
  }
}
</style>
