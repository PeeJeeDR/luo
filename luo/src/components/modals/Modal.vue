<template>
  <div class='modal'>
    <create-question v-if='modalType === "create-question"'/>
    <save-quiz v-if='modalType === "save-quiz"'/>
    <quiz-info v-if='modalType === "quiz-info"'/>
    <reports v-if='modalType === "report"'/>
    <suggest-category v-if='modalType === "suggest-category"'/>
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

export default {
  name: 'Modal',
  components: { CreateQuestion, SaveQuiz, QuizInfo, Reports, SuggestCategory },
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
  overflow: hidden;
  top: 5rem;

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