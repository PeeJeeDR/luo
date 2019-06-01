<template>
  <div class='question'>
    <div class='flex'>
      <img v-if='question.questionImg' :src='question.questionImg' alt='Question image.'>

      <div class='content' :style='question.questionImg !== "" ? "padding-left: 1rem;" : "padding: 0"'>
        <div class='flex justify-between align-center'>
          <h4 class='heading h--m'>{{ number + 1 }}. {{ question.question }}</h4>
          <button @click='deleteQuestion'>DELETE</button>
        </div>
        <hr>

        <div class='answers'>
          <p class='paragraph p--m p--weight-bold'>{{ question.answers.length }} answers</p>
          <ul>
            <li v-for='(answer, i) in question.answers' :key='i'>
              <p :class='`paragraph p--m ${ answer.correct && "correct" }`' >{{ answer.answer }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <audio v-if='question.audioUrl' :src='question.audioUrl' controls></audio>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['question', 'number'],
  methods: {
    deleteQuestion () {
      this.$store.dispatch('CreateQuiz/onQuestionDelete', { questionId: this.question.id });
    }
  }
}
</script>

<style lang='scss' scoped>
.question
{
  @include defaultShadow;
  border-radius: $smallRadius;
  margin-top: 0.7rem;
  padding: 0.8rem;

  img {
    width: 4rem;
    height: 4rem;
    
    object-fit: cover;
    border-radius: 5rem;
  }

  .content {
    .answers {
      margin-top: 1rem;
    }

    ul {
      padding-top: 0.2rem;

      li p {
        color: $mist;

        &.correct {
          color: $pinky;
        }
      }
    }
  }

  audio {
    margin-top: 1.5rem;
    width: 100%;
  }
}
</style>