<template>
  <div class='category'>
    <div v-ripple class='container flex align-center'>
      <img :src='require(`@/assets/icons/categories/${ data.img }.png`)' alt="">
      <h4>{{ data.category.charAt(0).toUpperCase() + data.category.substr(1) }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['data']
}
</script>

<style lang='scss' scoped>
.category {
  margin: 0.5rem 0;
  color: $texty;

  .container {
    padding: 0.5rem;

    img {
      width: 2.5rem;
    }

    h4 {
      color: $texty;
      margin-left: 1rem;
    }
  }
}
</style>
