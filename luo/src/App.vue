<template>
  <div id='app'>
    <!-- MAIN HEADER -->
    <main-header v-if='$route.meta.header'/>

    <!-- SIDE BAR (TOGGLED BY MAIN HEADER) -->
    <sidebar />

    <!-- ALL PAGES RENDERED IN ROUTER -->
    <router-view/>
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
  height: 100vh;
}
</style>
