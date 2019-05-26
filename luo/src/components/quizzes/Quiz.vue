<template>
  <div v-ripple class='animated fadeInLeft faster' :style='`animation-delay: ${ index * 0.1 }s`' @click='onQuizClick' @animationend='animatePress = false'>
    <div class='quiz' :class='animatePress ? "animate" : ""'>
      <div class='img-container'>
        <img :src='data.quizImg !== "" ? data.quizImg : Sample' alt='sample image.'>
      </div>

      <div class='content-container flex justify-between'>
        <div>
          <h4 class='heading h--xm'>{{ capFirstChar(data.title) }}</h4>
          <hr>
          <p class='paragraph p--m p--color-lighter'>{{ data.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalMethods from '@/mixins/GlobalMethods';
import Sample from '@/assets/img/quiz/sample.jpg';

export default {
  name: 'Quiz',
  mixins: [GlobalMethods],
  props: ['data', 'index'],
  data: () => ({
    Sample,
    animatePress: false
  }),
  methods: {
    onQuizClick () {
      this.animatePress = true;
      this.$store.dispatch('Modals/openModal', { type: 'quiz-info' });
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz {
  @include defaultShadow;
  margin-top: 0.7rem;
  border-radius: $smallRadius;
  overflow: hidden;
  
  .img-container {
    height: 12rem;

    img {
      width: 100%;
      height: 12rem;
      object-fit: cover;
    }
  }

  .content-container {
    padding: 0.8rem;
    position: relative;

    p {
      margin-top: 0.6rem;
      padding-right: 6rem;
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
