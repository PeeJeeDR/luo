<template>
  <div id='app'>
    <main-header @clicked='nav = "open"'/>
    <sidebar :open='nav' @clicked='nav = "closed"'/>
    <router-view/>
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader';
import Sidebar from '@/components/sidebar/Sidebar';

export default {
  name: 'App',
  components: { MainHeader, Sidebar },
  data: () => ({ nav: 'closed' })
}
</script>

<style lang='scss' scoped>
#app {
  height: 100vh;
}
</style>
