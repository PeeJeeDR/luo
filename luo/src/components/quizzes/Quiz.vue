<template>
  <div class='quiz flex'>
    <div class='img-container'>
      <img :src='Sample' alt='sample image.'>
    </div>

    <div class='content-container'>
      <h4 class='heading h--medium'>{{ data.title }}</h4>
      <p>{{ data.description }}</p>
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
  width: 94%;
  margin: 0 auto;
  padding: 1rem;
  margin-top: 0.7rem;
  border-radius: $smallRadius;
  
  .img-container {
    height: 7rem;

    img {
      width: 7rem;
      height: 7rem;
      object-fit: cover;
      border-radius: $smallRadius;
    }
  }

  .content-container {
    padding: 1rem;

  }
}
</style>
