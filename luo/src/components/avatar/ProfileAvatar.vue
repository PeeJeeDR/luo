<template>
  <div class='profile-avatar' v-if='img !== undefined'>
    <img :src='img.avatarUrl !== null ? "data:image/jpeg;base64," + img.avatarUrl : require(`@/assets/img/avatars/${ img.avatar }.png`)' alt='avatar image.'>

    <div class='star-container flex-center' v-if='false'>
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
