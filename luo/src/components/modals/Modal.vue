<template>
  <div class='modal'>
    <create-question v-if='modalType === "create-question"'/>
    <save-quiz v-if='modalType === "save-quiz"'/>
  </div>
</template>

<script>
import CreateQuestion from '@/components/modals/CreateQuestion';
import SaveQuiz from '@/components/modals/SaveQuiz';
import { mapState } from 'vuex';

export default {
  name: 'Modal',
  components: { CreateQuestion, SaveQuiz },
  computed: {
    ...mapState('Modals', ['modalType'])
  }
}
</script>

<style lang='scss'>
.modal
{
  position: fixed;
  z-index: 3;
  margin: auto;
  width: 94%;
  background-color: $snow;
  border-radius: $smallRadius;
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