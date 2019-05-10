<template>
  <div :class='`sidebar ${ open ? "open" : "closed" }`'>
    <div class='overlay' @click='closeSidebar'></div>

    <div class='bar'>
      <header>
        <h1>PROFILE</h1>
        <button @click='$router.push("/authentication")'>AUTH</button>
      </header>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { enableBodyScroll } from 'body-scroll-lock';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState('Sidebar', ['open'])
  },
  methods: {
    closeSidebar () {
      enableBodyScroll(document.getElementsByTagName('body')[0]);
      this.$store.dispatch("Sidebar/closeSidebar");
    }
  }
}
</script>

<style lang='scss' scoped>
.sidebar {
  .overlay, .bar {
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    transition: $easy;
  }

  .overlay {
    background-color: $coal;
    opacity: 0.5;
    z-index: 3;
  }

  .bar {
    background-color: $snow;
    width: 70%;
    overflow: hidden;
    z-index: 3;
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
