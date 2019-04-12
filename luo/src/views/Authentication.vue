<template>
  <div class='wrapper'>
    <button @click='toHome'>click</button>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  methods: {
    toHome () {
      this.$router.push('/');
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
