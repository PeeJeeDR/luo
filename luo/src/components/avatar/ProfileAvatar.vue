<template>
  <div class='profile-avatar'>
    <img :src='img' alt='Star icon.'>

    <div class='star-container flex-center'>
      <star />
    </div>
    
  </div>
</template>

<script>
import Star from '@/assets/icons/profile/StarFull.svg';

export default {
  name: 'ProfileAvatar',
  components: { Star },
  props: ['img']
}
</script>

<style lang='scss' scoped>
.profile-avatar {
  position: relative;

  img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 20rem;
    margin-top: -3.3rem;
    border: 5px solid $snow;
  }

  .star-container {
    background-color: $snow;
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 0;
    bottom: 5px;
    border-radius: 20rem;

    svg {
      fill: #FFD700;
      width: 1.5rem;
    }
  }
}
</style>
