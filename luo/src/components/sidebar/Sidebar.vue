<template>
  <div :class='`sidebar ${ open ? "open" : "closed" }`'>
    <div class='overlay' @click='$store.dispatch("Sidebar/closeSidebar")'></div>

    <div class='bar'>
      <header>
        <h1>PROFILE</h1>
      </header>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState('Sidebar', ['open'])
  }
}
</script>

<style lang='scss' scoped>
.sidebar {
  .overlay, .bar {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    transition: $easy;
    height: 100% !important;
  }

  .overlay {
    background-color: $coal;
    opacity: 0.5;
    z-index: 2;
  }

  .bar {
    background-color: $snow;
    width: 10rem;
    overflow: hidden;
    z-index: 2;
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
