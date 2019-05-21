<template>
  <div v-if='userFromDB !== undefined' class='profile-in-header default-vp flex justify-start align-start'>
    <img :src='require(`@/assets/img/avatars/${ userFromDB.avatar }.png`)' alt='avatar image.'>
    <div class='stats flex flex-wrap'>
      <stat :title='"name"' :value='userFromDB.username' :color='"light"'/>
      <stat :title='"likes"' :value='userFromDB.likes' :color='"light"'/>
      <stat :title='"Quizzes made"' :value='userFromDB.quizzes.length' :color='"light"'/>
      <stat :title='"Quizzed played"' :value='0' :color='"light"'/>
      <stat :title='"Reputation"' :value='userFromDB.reputation' :color='"light"'/>
    </div>
  </div>
</template>

<script>
import Stat from '@/components/utils/Stat';
import { mapState } from 'vuex';

export default {
  name: 'ProfileInHeader',
  components: { Stat },
  computed: {
    ...mapState('Users', ['userFromDB'])
  }
}
</script>

<style lang='scss' scoped>
.profile-in-header
{
  img {
    width: 4rem;
    margin-right: 1.5rem;
    border: 3px solid $snow;
    border-radius: 200rem;
  }

  .stat {
    width: 50%;
    margin-bottom: 0.5rem;
  }
}
</style>