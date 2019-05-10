<template>
  <div class='submit-and-cancel flex justify-end'>
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
  padding-top: 3rem;
  background: none;
  border: none;

  &:first-child {
    margin-right: 1rem;
    color: $mist;
  }

  &:last-child {
    color: $pinky;
    font-weight: bold;
  }
}
</style>
