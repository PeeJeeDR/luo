<template>
  <div class='quiz'>
    <div class='img-container'>
      <img :src='Sample' alt='sample image.'>
    </div>

    <div class='content-container'>
      <h4 class='heading h--medium dark'>
        {{ data.title.charAt(0).toUpperCase() + data.title.substr(1) }}
      </h4>
      <hr>
      <p class='paragraph p--small lighter bold'>{{ data.description }}</p>
    </div>
  </div>
</template>

<script>
import Sample from '@/assets/img/sample.jpg';

export default {
  name: 'Quiz',
  props: ['data'],
  data: () => ({
    Sample
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
      height: 0.4rem;
      width: 3rem;
      margin-top: 0.3rem;
      border: none;
    }

    p {
      margin-top: 0.6rem;
    }
  }
}
</style>
