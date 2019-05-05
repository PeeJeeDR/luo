<template>
  <div class='create-quiz page wrapper'>
    <h2>
      Create quiz
    </h2>
  </div>
</template>

<script>
export default {
  name: 'CreateQuiz',
  created () {
    this.$store.dispatch('Header/onPageLoad', { title: 'create quiz' });
  }
}
</script>

<style lang='scss' scoped>
.create-quiz {

}
</style>
