<template>
  <div class='profile'>
    
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';

export default {
  name: 'Profile',
  created () {
    this.$store.dispatch('Users/fetchUserById', { id: fire.auth().currentUser.uid });
  }
}
</script>

<style lang='scss' scoped>
.profile
{
  
}
</style>