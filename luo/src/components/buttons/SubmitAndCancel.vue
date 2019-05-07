<template>
  <div class='submit-and-cancel flex'>
    <button type='button' @click='$emit("oncancel")'>Cancel</button>
    <button type='submit'>Submit</button>
  </div>
</template>

<script>
export default {
  name: 'SubmitAndCancel'
}
</script>

<style lang='scss' scoped>
.submit-and-cancel button {
  &:first-child {
    margin-right: 1rem;
  }
}
</style>
