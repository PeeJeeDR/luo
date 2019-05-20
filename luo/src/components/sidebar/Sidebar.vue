<template>
  <div :class='`sidebar ${ open ? "open" : "closed" }`'>
    <div class='overlay' @click='closeSidebar'></div>

    <div class='bar'>
      <header>
        <img :src='Logo' alt='Logo of Luo.'>
        <button @click='$router.push("/authentication")'>AUTH</button>
      </header>

      <categories />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { enableBodyScroll } from 'body-scroll-lock';
import Logo from '@/assets/img/Logo@2x.png';
import Categories from '@/components/categories/Categories';

export default {
  name: 'Sidebar',
  components: { Categories },
  data: () => ({
    Logo
  }),
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
    overflow: scroll;
    z-index: 3;
    white-space: nowrap;
    padding: 2rem 0;

    img {
      width: 4rem;
      margin-left: 2rem;
    }
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
