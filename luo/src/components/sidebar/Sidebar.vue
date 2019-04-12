<template>
  <div :class='`sidebar ${ open }`'>
    <div class='overlay' @click='$emit("clicked")'></div>

    <div class='bar'>
      <header>
        <h1>PROFILE</h1>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['open']
}
</script>

<style lang='scss' scoped>
.sidebar {
  header {
    @include gradient;
  }

  .overlay, .bar {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    transition: $easy;
  }

  .overlay {
    background-color: $coal;
    opacity: 0.5;
  }

  .bar {
    background-color: $snow;
    width: 10rem;
    overflow: hidden;
  }

  &.closed {
    .overlay {
      opacity: 0;
      z-index: -1;
    }

    .bar {
      width: 0;
    }
  }
}
</style>
