<template>
  <div v-if='user !== undefined' class='profile-in-header'>
    <div class='flex justify-start align-start'>
      <div class='img-container' @click='onAvatarClick'>
        <image-uploader
          style='display: none'
          :debug='1'
          :maxWidth='300'
          :quality='0.6'
          :autoRotate='true'
          outputFormat='string'
          :preview='true'
          accept='image/*'
          doNotResize='["gif", "svg"]'
          @input='onImgSelect'
        >
          <label for='fileInput' ref='img' slot='upload-label'></label>
        </image-uploader>

        <img :src='user.avatarUrl !== null ? user.avatarUrl : require(`@/assets/img/avatars/${ user.avatar }.png`)' alt='Avatar image.'>
        <button v-if='fire.auth().currentUser && fire.auth().currentUser.uid === user.id' class='flex-center'><edit /></button>
      </div>
    
      <div class='stats flex flex-wrap'>
        <stat :title='"Name"' :value='user.username' :color='"light"'/>
        <stat :title='"Likes"' :value='likesOfUser' :color='"light"'/>
        <stat :title='"Quizzes made"' :value='quizzesMadeByUser.length' :color='"light"'/>
        <stat :title='"followers"' :value='user.followers.length' :color='"light"'/>
      </div>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState, mapGetters } from 'vuex';
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
    ...mapState('Users', ['user']),
    ...mapState('Quizzes', ['quizzesMadeByUser', 'quizzesPlayedByUser']),
    ...mapGetters('Quizzes', ['likesOfUser'])
  },
  created () {
    console.log('USER', this.user);
  },
  methods: {
    onAvatarClick () {
      if (fire.auth().currentUser && fire.auth().currentUser.uid === this.user.id) {
        this.$refs.img.click();
      }
    },

    onImgSelect (output) {
      this.$store.dispatch('Users/updateUserAvatar', { base64: output });
    }
  }
}
</script>

<style lang='scss' scoped>
.profile-in-header
{
  padding: 2rem 0;
  
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