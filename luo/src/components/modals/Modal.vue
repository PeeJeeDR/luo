<template>
  <div class='modal'>
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
import CreateQuestion from '@/components/modals/CreateQuestion';
import SaveQuiz from '@/components/modals/SaveQuiz';
import QuizInfo from '@/components/modals/QuizInfo';
import Reports from '@/components/modals/Reports';
import SuggestCategory from '@/components/modals/SuggestCategory';
import QRInfo from '@/components/modals/QRInfo';

export default {
  name: 'Modal',
  components: { CreateQuestion, SaveQuiz, QuizInfo, Reports, SuggestCategory, QRInfo },
  computed: {
    ...mapState('Modals', ['modalType'])
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

  .title {
    margin-bottom: 1rem;
  }

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-radius: $smallRadius;
  }
}
</style>