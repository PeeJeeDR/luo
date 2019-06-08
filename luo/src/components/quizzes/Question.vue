<template>
  <div class='question'>
    <div class='flex justify-between'>

      <div class='left flex'>
        <!-- Small image. -->
        <img v-if='question.questionImg' :src='question.questionImg' alt='Question image.'>

        <!-- Question title and answers. -->
        <div class='content' :style='question.questionImg !== "" ? "padding-left: 1rem;" : "padding: 0"'>
          <h4 class='heading h--m'>{{ number + 1 }}. {{ question.question }}</h4>
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

        <!-- Audio, needs to be replaced later. -->
        <audio v-if='question.audioUrl' :src='question.audioUrl' controls></audio>
      </div>

      <div class='right'>
        <button v-ripple class='flex-center' @click='editQuestion'><edit /></button>
        <button class='flex-center' @click='deleteQuestion'><trash /></button>
      </div>
    </div>
  </div>
</template>

<script>
import Edit from '@/assets/icons/quizzes/Edit.svg';
import Trash from '@/assets/icons/quizzes/Trash.svg';

export default {
  name: 'Question',
  components: { Edit, Trash },
  props: ['question', 'number'],
  methods: {
    editQuestion () {
      this.$store.dispatch('CreateQuiz/onQuestionEdit', { question: this.question });
    },

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
  overflow: hidden;
  margin: 1rem auto 0 auto;

  @include desktop {
    width: 45rem;
  }

  .left {
    padding: 0.8rem;
    width: calc(100% - 5rem);

    img {
      width: 4rem;
      height: 4rem;
      object-fit: cover;
      border-radius: 5rem;
    }

    .content {
      width: 100%;

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

  .right {
    width: 4rem;

    button {
      min-height: 5rem;
      height: 50%;
      width: 100%;
      border: none;
      border-left: 1px solid $mr-grey;
      background-color: $snow;

      svg {
        fill: $pinky;
        width: 35%;
        height: 35%;
      }

      &:last-child {
        border-top: 1px solid $mr-grey;
      }
    }
  }
}
</style>