<template>
  <div class='animated fadeInLeft faster' :style='`animation-delay: ${ index * 0.1 }s`'>
    <div class='quiz'>
      <div class='img-container'>
        <img :src='Sample' alt='sample image.'>
      </div>

      <div class='content-container flex justify-between'>
        <div>
          <h4 class='heading h--medium dark'>
            {{ capFirstChar(data.title) }}
          </h4>
          <hr>
          <p class='paragraph p--small lighter bold'>{{ data.description }}</p>
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
import Sample from '@/assets/img/sample.jpg';
import SquareButton from '@/components/buttons/SquareButton';
import Controller from '@/assets/icons/quizzes/Controller.svg';

export default {
  name: 'Quiz',
  mixins: [GlobalMethods],
  components: { SquareButton, Controller },
  props: ['data', 'index'],
  data: () => ({
    Sample,
  })
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
    padding: 0.8rem 0.8rem;

    hr {
      background-color: $pinky;
      height: 0.25rem;
      width: 3rem;
      margin-top: 0.3rem;
      border: none;
      border-radius: 10rem;
    }

    p {
      margin-top: 0.6rem;
    }

    .play {
      margin: 1rem -1.5rem -2rem 0;

      svg {
        transform: rotate(-45deg);
        width: 2.5rem;
        margin-left: -1rem;
      }
    }
  }
}
</style>
