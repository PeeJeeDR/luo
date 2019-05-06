<template>
  <div class='create-quiz page big-wrapper flex direction-col justify-between align-center'>
    <create-quiz-modal v-if='modal'/>
    
    <create />

    <default-button :content='"create question"' @click.native='$store.dispatch("Modals/onCreateClick")'/>
  </div>
</template>

<script>
import Create from '@/assets/icons/quizzes/Create.svg';
import DefaultButton from '@/components/buttons/DefaultButton';
import CreateQuizModal from '@/components/modals/CreateQuizModal';
import { mapState } from 'vuex';

export default {
  name: 'CreateQuiz',
  components: { DefaultButton, CreateQuizModal, Create },
  computed: {
    ...mapState('Modals', ['modal'])
  },
  created () {
    this.$store.dispatch('Header/onPageLoad', { title: 'create quiz', leftIcon: 'back' });
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {
  padding: 5.5rem 0 2rem 0;
  position: relative;

  .default-button {
    width: 15rem;
    margin: 0 auto;
  }

  svg {
    fill: $mist;
    width: 5rem;
  }
}
</style>
