<template>
  <div id='app'>
    <main-header />
    <router-view/>
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader';

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>

</style>
