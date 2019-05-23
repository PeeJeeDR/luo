<template>
  <div class='section-title flex align-center'>
    <h3 class='heading h--xm h--color-primary'>{{ title.toUpperCase() }}</h3>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: ['title']
}
</script>

<style lang='scss' scoped>
.section-title
{
  h3 {
    white-space: nowrap;
    margin-right: 1rem;
  }

  hr {
    width: 100%;
    height: 2px;
    margin: 0;
    background-color: $dawn;
  }
}
</style>