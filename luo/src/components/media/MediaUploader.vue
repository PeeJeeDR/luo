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

    <!-- Img preview. -->
    <img v-if='imgSource !== ""' :src='imgSource' alt='Uploaded file.' @click='$refs.img.click()'>

    <!-- Audio preview. -->
    <audio v-if='audioSource !== ""' :src='audioSource' controls></audio>

    <!-- Buttons. -->
    <default-button v-if='imgSource === "" && img' :content='"Add quiz image"' @click.native='$refs.img.click()'/>
    <default-button v-if='audioSource === "" && audio' :content='"Add quiz audio"' @click.native='$refs.audio.click()'/>
  </div>
</template>

<script>
import { storage } from '@/firebase/firebase';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'MediaUploader',
  components: { DefaultButton },
  props: ['img', 'audio', 'type', 'formData'],
  data: () => ({
    imgSource: '',
    audioSource: ''
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