<template>
  <div class='modal'>

    <div class='loading-overlay flex-center' v-if='mediaUploading'>
      <div class='greyed'></div>

      <!-- === LOADER === -->
      <moon-loader :loading='mediaUploading' color='#BA42CC'/>
    </div>

    <create-question v-if='modalType === "create-question"'/>
    <save-quiz v-if='modalType === "save-quiz"'/>
    <quiz-info v-if='modalType === "quiz-info"'/>
    <reports v-if='modalType === "report"'/>
    <suggest-category v-if='modalType === "suggest-category"'/>
    <q-r-info v-if='modalType === "qr"'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import MoonLoader from 'vue-spinner/src/MoonLoader';
import CreateQuestion from '@/components/modals/CreateQuestion';
import SaveQuiz from '@/components/modals/SaveQuiz';
import QuizInfo from '@/components/modals/QuizInfo';
import Reports from '@/components/modals/Reports';
import SuggestCategory from '@/components/modals/SuggestCategory';
import QRInfo from '@/components/modals/QRInfo';

export default {
  name: 'Modal',
  components: { MoonLoader, CreateQuestion, SaveQuiz, QuizInfo, Reports, SuggestCategory, QRInfo },
  computed: {
    ...mapState('Modals', ['modalType']),
    ...mapState('CreateQuiz', ['mediaUploading'])
  },
  created () {
    disableBodyScroll(document.getElementsByTagName('body')[0]);
  },
  beforeDestroy () {
    enableBodyScroll(document.getElementsByTagName('body')[0]);
  }
}
</script>

<style lang='scss'>
.modal
{
  @include subtileShadow;
  position: fixed;
  z-index: 30;
  margin: auto;
  width: 94%;
  background-color: $snow;
  border-radius: $mediumRadius;
  padding: 0 2rem 2rem 2rem;
  max-height: 80%;
  overflow: scroll;
  top: 8rem; left: 0; right: 0;

  @include phone {
    top: 5rem;
  }

  @include tablet {
    width: 40rem;
  }

  @include desktop {
    width: 40rem;
  }

  section {
    margin-top: 2.5rem;
  }

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-radius: $smallRadius;
  }

  .title {
    margin-bottom: 1rem;
  }

  .default-button {
    display: flex;
    justify-content: center;
    margin: 0 auto;

    @include tablet {
      width: 15rem;
    }

    @include desktop {
      width: 15rem;
    }

    &:last-child {
      margin-top: 1rem;
    }
  }

  .loading-overlay {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;

    .greyed {
      position: inherit;
      width: 100%;
      height: 100%;
      background-color: $snow;
      opacity: 0.9;
    }
  }
}
</style>