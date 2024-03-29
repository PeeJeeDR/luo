<template>
  <div v-ripple class='quiz-container animated fadeInLeft faster' :style='`animation-delay: ${ index * 0.1 }s`' @click='onQuizClick'>
    <div :class='`quiz ${ animatePress && "animate" }`' @animationend='animatePress = false'>
      <div class='img-container'>
        <img :src='quiz.quizImg !== "" ? quiz.quizImg : require(`@/assets/img/samples/categories/${ quiz.quizSample }.jpg`)' :alt='`Header image of the "${ quiz.title }" quiz.`'>
      </div>

      <div class='content-container flex justify-between'>
        <div class='title-container'>
          <div class='title flex align-center justify-between'>
            <h4 class='heading h--xm'>{{ capFirstChar(quiz.title) }}</h4>
            <q-r v-if='quiz.isQRQuiz'/>
          </div>
          <hr>
          <p class='paragraph p--m p--color-lighter'>{{ quiz.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalMethods from '@/mixins/GlobalMethods';
import QR from '@/assets/icons/bottom-nav/QR.svg';

export default {
  name: 'Quiz',
  mixins: [GlobalMethods],
  components: { QR },
  props: ['quiz', 'index'],
  data: () => ({
    animatePress: false
  }),
  methods: {
    async onQuizClick () {
      // Animation.
      this.animatePress = true;

      // Fetch quiz by id.
      await this.$store.dispatch('Quizzes/fetchQuizById', { id: this.quiz.id }).then(() => {
        this.$store.dispatch('Modals/openModal', { type: 'quiz-info' });
      });
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz-container {
  @include phone {
    width: 100%;
    margin-top: 1rem;
  }

  @include tablet {
    width: calc(50% - 2rem);
    margin: 1rem 0.5rem 0 0.5rem;
  }

  @include desktop-small {
    width: calc(50% - 2rem);
    margin: 1rem 0.5rem 0 0.5rem;
  }

  @include desktop-large {
    width: calc(50% - 2rem);
    margin: 1rem 0.5rem 0 0.5rem;
  }
}

.quiz {
  @include defaultShadow;
  border-radius: $smallRadius;
  overflow: hidden;
  width: 100%;
  background-color: $snow;

  &:hover {
    cursor: pointer;
  }

  .img-container img {
    width: 100%;
    height: 12rem;
    object-fit: cover;

    @include phone-large { height: 15rem }
    @include desktop-small { height: 18rem }
    @include desktop-large { height: 20rem }
  }

  .content-container {
    padding: 1rem;
    position: relative;

    .title-container {
      width: 100%;

      .title {
        svg {
          width: 1.5rem;
          fill: $pinky;
        }
      }

      p {
        margin-top: 0.6rem;
        word-wrap: break-word;
      }
    }
  }

  &.animate {
    animation: press 250ms;
  }

  @keyframes press {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(5px);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</style>
