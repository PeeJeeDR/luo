<template>
  <div class='create-quiz-modal'>
    <medium-heading :color='"primary"'>Question 1</medium-heading>

    <form>
      <input type='text' class='default-input' placeholder='Question title'>

      <div class='answers'>
        <!-- SINGLE ANSWER -->
        <div class='answer flex align-center' v-for='i in nbrOfAnswers' :key='i'>
          <div class='check'></div>
          <input type='text' class='default-input' :placeholder='`Answer ${ i }`'>
        </div>

        <p @click='nbrOfAnswers += 1' v-if='nbrOfAnswers < 4'>Add answer</p>
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
  },
  data: () => ({
    nbrOfAnswers: 1
  })
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

  .answers {
    padding: 1rem 0;

    .answer {
      margin-bottom: 1rem;

      &:last-child {
        margin: 0;
      }
    }

    .check {
      width: 2rem;
      height: 2rem;
      background-color: $pinky;
    }

    input {
      margin: 0;
    }
  }
}
</style>
