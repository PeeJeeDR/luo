<template>
  <div class='modal'>
    <!-- Loading. -->
    <div class='loading-overlay flex-center' v-if='mediaUploading'>
      <div class='greyed'></div>
      <moon-loader :loading='mediaUploading' color='#BA42CC'/>
    </div>

    <button class='close-modal flex-center' @click='closeModal'>
      <close />
    </button>

    <!-- Contents. -->
    <create-question key='0' v-if='modalType === "create-question"'/>
    <save-quiz key='1' v-if='modalType === "save-quiz"'/>
    <quiz-info key='2' v-if='modalType === "quiz-info"'/>
    <reports key='3' v-if='modalType === "report"'/>
    <suggest-category key='4' v-if='modalType === "suggest-category"'/>
    <q-r-info key='5' v-if='modalType === "qr"'/>
    <create-quiz-confirm key='6' v-if='modalType === "confirm"'/>
    <not-logged-in key='7' v-if='modalType === "not-logged-in"'/>
    <forgot-password key='8' v-if='modalType === "forgot-password"'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Close from '@/assets/icons/main-header/Close.svg';
import MoonLoader from 'vue-spinner/src/MoonLoader';
import CreateQuestion from '@/components/modals/CreateQuestion';
import SaveQuiz from '@/components/modals/SaveQuiz';
import QuizInfo from '@/components/modals/QuizInfo';
import Reports from '@/components/modals/Reports';
import SuggestCategory from '@/components/modals/SuggestCategory';
import CreateQuizConfirm from '@/components/modals/confirm/CreateQuizConfirm';
import NotLoggedIn from '@/components/modals/NotLoggedIn';
import ForgotPassword from '@/components/modals/ForgotPassword';

export default {
  name: 'Modal',
  components: { 
    Close,
    MoonLoader, 
    CreateQuestion, 
    SaveQuiz, 
    QuizInfo, 
    Reports, 
    SuggestCategory, 
    CreateQuizConfirm, 
    NotLoggedIn,
    ForgotPassword
  },
  computed: {
    ...mapState('Modals', ['modalType']),
    ...mapState('CreateQuiz', ['mediaUploading'])
  },
  created () {
    disableBodyScroll(document.getElementsByTagName('body')[0]);
  },
  beforeDestroy () {
    enableBodyScroll(document.getElementsByTagName('body')[0]);
  },
  methods: {
    closeModal () {
      this.$store.dispatch('Modals/closeModal');
    }
  }
}
</script>

<style lang='scss'>
.modal
{
  @include subtileShadow;
  position: fixed !important;
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

  button.close-modal {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: $snow;
    border-radius: 20rem;
    border: none;

    svg {
      width: 90%;
      height: 90%;
      fill: $mist;
    }
  }

  .title {
    margin-bottom: 1rem;
  }

  .settings {
    @include phone {
      flex-direction: column;
      align-items: flex-start;
    }

    .setting {
      margin: 0 1rem;

      @include phone {
        margin-top: 1.5rem;
      }
    }
  }

  .default-button {
    display: flex;
    justify-content: center;

    @include tablet {
      width: 15rem;
    }

    @include desktop {
      width: 15rem;
    }
  }

  .loading-overlay {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    z-index: 2;

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