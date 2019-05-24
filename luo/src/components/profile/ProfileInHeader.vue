<template>
  <div v-if='userFromDB !== undefined' class='profile-in-header default-vp flex justify-start align-start'>
    <div class='img-container' @click='onAvatarClick'>
      <input type='file' ref='img' accept='image/*' style='display: none' @change='onImgSelect'>
      <img :src='userFromDB.avatarUrl !== null ? "data:image/jpeg;base64," + userFromDB.avatarUrl : require(`@/assets/img/avatars/${ userFromDB.avatar }.png`)' alt='avatar image.'>
      <button v-if='fire.auth().currentUser.uid === userFromDB.id' class='flex-center'><edit /></button>
    </div>
  
    <div class='stats flex flex-wrap'>
      <stat :title='"name"' :value='userFromDB.username' :color='"light"'/>
      <stat :title='"likes"' :value='userFromDB.likes' :color='"light"'/>
      <stat :title='"Quizzes made"' :value='userFromDB.numberOfQuizzesMade' :color='"light"'/>
      <stat :title='"Quizzed played"' :value='0' :color='"light"'/>
      <stat :title='"Reputation"' :value='userFromDB.reputation' :color='"light"'/>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import image2base64 from 'image-to-base64';
import Edit from '@/assets/icons/quizzes/Edit.svg';
import Stat from '@/components/utils/Stat';

export default {
  name: 'ProfileInHeader',
  components: { Edit, Stat },
  data: () => ({
    fire
  }),
  computed: {
    ...mapState('Users', ['userFromDB'])
  },
  methods: {
    onAvatarClick () {
      if (fire.auth().currentUser.uid === this.userFromDB.id) {
        this.$refs.img.click();
      }
    },

    onImgSelect (e) {
      if (e.target.files[0] && e.target.files[0].type.includes('image')) {
        image2base64(URL.createObjectURL(e.target.files[0])).then(res => {
          this.$store.dispatch('Users/updateUserAvatar', { base64: res });
        }).catch(() => {});
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.profile-in-header
{
  .img-container {
    position: relative;

    img {
      width: 4rem;
      height: 4rem;
      margin-right: 1.5rem;
      border: 2px solid $snow;
      border-radius: 200rem;
      object-fit: cover;
    }

    button {
      background-color: $pinky;
      border-radius: 20rem;
      width: 1.8rem;
      height: 1.8rem;
      border: 2px solid $snow;
      position: absolute;
      left: 0; bottom: 0;

      svg {
        width: 0.8rem;
        fill: $snow;
      }
    }
  }

  .stat {
    width: 50%;
    margin-bottom: 0.5rem;
  }
}
</style>