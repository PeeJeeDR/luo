<template>
  <div :class='`sidebar ${ open ? "open" : "closed" }`'>
    <div class='overlay' @click='closeSidebar'></div>

    <div class='bar'>
      <header>
        <img :src='Logo' alt='Logo of Luo.'>
        <button @click='$router.push("/authentication")'>AUTH</button>
      </header>

      <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>
      <categories v-if='!loading'/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { enableBodyScroll } from 'body-scroll-lock';
import Logo from '@/assets/img/logo/Logo.png';
import Categories from '@/components/categories/Categories';
import MoonLoader from 'vue-spinner/src/MoonLoader';

export default {
  name: 'Sidebar',
  components: { Categories, MoonLoader },
  data: () => ({
    Logo
  }),
  computed: {
    ...mapState('Categories', ['loading']),
    ...mapState('Sidebar', ['open'])
  },
  created () {
    this.$store.dispatch('Categories/fetchCategories');
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
    transition: all $fast ease-in-out;
    z-index: 5;
  }

  .overlay {
    background-color: $coal;
    opacity: 0.5;
  }

  .bar {
    background-color: $snow;
    width: 70%;
    overflow: scroll;
    white-space: nowrap;
    padding: 2rem 0;

    img {
      width: 4rem;
      margin-left: 1.5rem;
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

  .categories {
    margin-top: 3rem;
  }
}
</style>
