<template>
  <input type='text' :placeholder='placeholder'>
</template>

<script>
export default {
  name: 'DefaultInput',
  props: ['placeholder']
}
</script>

<style lang='scss' scoped>
input {
  display: block;
  height: 30px;
  width: 100%;
  background-color: $mr-grey;
  border: none;
  border-radius: $smallRadius;
  margin: 10px 0;
  padding: 1.4rem 1rem;
  font-weight: bold;
  font-size: $ned;
  color: $texty;
  
  ::placeholder {
    color: $clouds;
  }
}
</style>
