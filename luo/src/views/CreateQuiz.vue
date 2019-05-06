<template>
  <div class='create-quiz page big-wrapper flex direction-col justify-between'>
    <h2>
      Create quiz
    </h2>

    <default-button :content='"create question"'/>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'CreateQuiz',
  components: { DefaultButton },
  created () {
    this.$store.dispatch('Header/onPageLoad', { title: 'create quiz', leftIcon: 'back' });
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {
  padding: 5.5rem 0 2rem 0;

  .default-button {
    width: 15rem;
    margin: 0 auto;
  }
}
</style>
