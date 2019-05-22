<template>
  <div class='animated fadeInLeft faster' :style='`animation-delay: ${ index * 0.1 }s`'>
    <div class='quiz'>
      <div class='img-container'>
        <img :src='data.quizImg !== null ? data.quizImg : Sample' alt='sample image.'>
      </div>

      <div class='content-container flex justify-between'>
        <div>
          <h4 class='heading h--xm'>{{ capFirstChar(data.title) }}</h4>
          <hr>
          <p class='paragraph p--m p--color-lighter'>{{ data.description }}</p>
        </div>

        <square-button class='play'>
          <controller />
        </square-button>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalMethods from '@/mixins/GlobalMethods';
import Sample from '@/assets/img/quiz/sample.jpg';
import SquareButton from '@/components/buttons/SquareButton';
import Controller from '@/assets/icons/quizzes/Controller.svg';

export default {
  name: 'Quiz',
  mixins: [GlobalMethods],
  components: { SquareButton, Controller },
  props: ['data', 'index'],
  data: () => ({
    Sample,
  }),
  created () {
    console.log('data', this.data);
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

    .play {
      margin: 1rem -0.8rem -1.2rem 0;
      bottom: 0;
      right: 0;
      position: absolute !important;

      svg {
        transform: rotate(-45deg);
        width: 2.5rem;
        margin-left: -1rem;
      }
    }
  }
}
</style>
