<template>
  <div class='create-quiz-modal'>
    <medium-heading :color='"primary"'>Question 1</medium-heading>

    <form>
      <input type='text' class='default-input'>

      <div class='questions'>

      </div>
    </form>
  </div>
</template>

<script>
import MediumHeading from '@/components/headings/MediumHeading';

export default {
  name: 'CreateQuizModal',
  components: {
    MediumHeading
  }
}
</script>

<style lang='scss' scoped>
.create-quiz-modal {
  position: absolute;
  background-color: $snow;
  width: 100%;
  z-index: 5;
  border-radius: $smallRadius;
  padding: 2rem;
  overflow: hidden;
}
</style>
