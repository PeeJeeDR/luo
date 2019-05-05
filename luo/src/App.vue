<template>
  <div id='app'>
    <!-- MAIN HEADER -->
    <main-header v-if='$route.meta.header'/>

    <!-- SIDE BAR (TOGGLED BY MAIN HEADER) -->
    <sidebar />

    <!-- ALL PAGES RENDERED IN ROUTER -->
    <transition name='router-anim' enter-active-class='animated slideInLeft faster' leave-active-class='animated slideOutLeft faster'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader';
import Sidebar from '@/components/sidebar/Sidebar';

export default {
  name: 'App',
  components: { MainHeader, Sidebar }
}
</script>

<style lang='scss'>
#app {
  height: 100%;
  position: relative;
}
</style>
