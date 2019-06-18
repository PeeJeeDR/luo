<template>
  <div class='media-uploader'>
    <!-- Image uploader. -->
    <image-uploader
      style='display: none'
      :debug='1'
      :maxWidth='700'
      :quality='0.8'
      :autoRotate='true'
      outputFormat='string'
      :preview='true'
      accept='image/*'
      doNotResize='["gif", "svg"]'
      @input='setImage'
      @onUpload='$store.dispatch("CreateQuiz/onMediaUploadStart")'
      @onComplete='$store.dispatch("CreateQuiz/onMediaUploadEnd")'
    >
      <label for='fileInput' ref='img' slot='upload-label'></label>
    </image-uploader>

    <!-- Audio uploader. -->
    <input style='display: none;' accept='audio/*' type='file' ref='audio' @change='onAudioSelect'>

    <div :class='`preview-container ${ (audioSource && imgSource === "") && "audio-added" }`'>
      <!-- Img preview. -->
      <img v-if='imgSource !== ""' :src='imgSource' alt='Uploaded file.' @click='$refs.img.click()'>

      <h1 v-if='audioSource && imgSource === ""' class='heading h--xxm h--color-mist flex-center' @click='$refs.img.click()'>Upload image</h1>

      <!-- Audio preview. -->
      <div v-if='audioSource' class='audio-container flex justify-between align-center'>
        <audio-button v-if='audioSource' :file='audioSource' :autoPlay='false' :isAudioFile='false'/>
        <button class='close flex-center' @click='deleteAudio'><close/></button>
      </div>
    </div>

    <!-- Buttons. -->
    <div class='buttons flex justify-center'>
      <default-button v-if='imgSource === "" && img' :content='`Add ${ type } image`' @click.native='$refs.img.click()'/>
      <default-button v-if='audioSource === "" && audio' :content='`Add ${ type } audio`' @click.native='$refs.audio.click()'/>
    </div>
  </div>
</template>

<script>
import { storage } from '@/firebase/firebase';
import DefaultButton from '@/components/buttons/DefaultButton';
import AudioButton from '@/components/buttons/AudioButton';
import Close from '@/assets/icons/main-header/Close.svg';

export default {
  name: 'MediaUploader',
  components: { DefaultButton, AudioButton, Close },
  props: ['img', 'audio', 'type', 'formData'],
  data: () => ({
    imgSource: '',
    audioSource: '',
  }),
  created () {
    if (this.type === 'question') {
      this.imgSource = this.formData.questionImg;
      this.audioSource = this.formData.questionAudio;
    }

    if (this.type === 'quiz') {
      this.imgSource = this.formData.quizImg;
    }
  },
  methods: {
    setImage (output) {
      this.imgSource = output;
      this.$emit('onImgUpload', output);
    },

    deleteAudio () {
      this.audioSource = '';
    },

    onAudioSelect (e) {
      this.$store.dispatch('CreateQuiz/onMediaUploadStart');

      storage.ref('question-audio-files').child(e.target.files[0].name.split('.')[0]).put(e.target.files[0])
      .then(res => {
        res.ref.getDownloadURL()
        .then(url => {
          if (res.state === 'success' && url) {
            this.audioSource = url;
            this.$emit('onAudioUpload', this.audioSource);
          }

          this.$store.dispatch('CreateQuiz/onMediaUploadEnd');
        })
        .catch(() => {
          this.$store.dispatch('CreateQuiz/onMediaUploadEnd');
        });
      }).catch(() => {
        this.$store.dispatch('CreateQuiz/onMediaUploadEnd');
      });
    }
  }
}
</script>

<style lang='scss'>
.media-uploader {
  .preview-container {
    position: relative;

    &.audio-added {
      height: 12rem;
      background: $mr-grey;
      border-radius: $smallRadius;
      text-align: center;

      h1 {
        width: 100%;
        height: 100%;
      }
    }

    .audio-container {
      position: absolute;
      background-color: $snow;
      bottom: 1.2rem;
      left: 1rem;
      padding: 0.5rem;
      border-radius: $smallRadius;
      width: 7rem;
      z-index: 1;

      button.close  {
        padding: 0.5rem;
        background: none;
        border-radius: $smallRadius;
        border: none;
        transition: all $fast ease-in-out;

        &:hover {
          background-color: lighten($mr-grey, 5%);
        }

        svg{
          fill: $mist;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }

  .buttons {
    margin: 1rem -1%;

    @include phone-small {
      flex-direction: column;
    }

    .default-button {
      width: 48%;
      margin: 0 1%;

      @include phone-small {
        width: 100%;
      }

      &:last-child {
        @include phone-small {
          margin-top: 1rem;
        }
      }
    }
  }
}
</style>
