<template>
  <div :class='`submit-and-cancel flex ${ includeBack ? "justify-between" : "justify-end" }`'>
    <div v-if='includeBack' class='left'>
      <button @click='$emit("onback")'>Back</button>
    </div>
    
    <div class='right'>
      <button @click='$emit("oncancel")'>Cancel</button>
      <button @click='$emit("onsubmit")'>Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubmitAndCancel',
  props: ['includeBack']
}
</script>

<style lang='scss' scoped>
.submit-and-cancel {
  padding-top: 3rem;

  button {
    background: none;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: $smallRadius;
    transition: all $fast ease-in-out;

    &:hover {
      background-color: lighten($mr-grey, 5%);
    }
  }

  .left button {
    &:first-child {
      margin-right: 1rem;
      color: $mist;
    }
  }

  .right button {
    &:first-child {
      margin-right: 1rem;
      color: $mist;
    }

    &:last-child {
      color: $pinky;
      font-weight: bold;
    }
  }
}
</style>
