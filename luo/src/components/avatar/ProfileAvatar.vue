<template>
  <div class='profile-avatar' v-if='img !== undefined'>
    <div class='flex align-center'>
      <img :src='img.avatarUrl !== null ? img.avatarUrl : require(`@/assets/img/avatars/${ img.avatar }.png`)' alt='avatar image.'>
      <div class='view'>
        <p class='paragraph p--color-primary p--weight-bold p--s'>VIEW PROFILE</p>
      </div>
    </div>
    

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
    flex: 0 0 5.5rem;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 20rem;
    border: 5px solid $snow;
    background-color: $snow;
    z-index: 1;
  }

  .view p {
    background-color: $snow;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    width: 8rem;
    margin-left: -1.5rem;
    border-radius: $smallRadius;
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
