<template>
  <div :class='`sidebar ${ open ? "open" : "closed" }`'>
    <div class='overlay' @click='closeSidebar'></div>

    <div class='bar'>
      <header class='flex align-end'>
        <img :src='Logo' alt='Logo of Luo.'>
      </header>

      <moon-loader :loading='loading' color='#BA42CC' class='spinner flex-center'/>
      <categories v-if='!loading'/>

      <div class='bottom'>
        <hr>

        <div v-if='fire.auth().currentUser' v-ripple class='icon flex align-center' @click='onAuthClick'>
          <logout />
          <h4 class='heading h--m h--color-mist'>Logout</h4>
        </div>

        <div v-if='!fire.auth().currentUser' v-ripple class='icon flex align-center' @click='onAuthClick'>
          <login />
          <h4 class='heading h--m h--color-mist'>Login</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import { enableBodyScroll } from 'body-scroll-lock';
import Logo from '@/assets/img/logo/Logo.png';
import Logout from '@/assets/icons/sidebar/Logout.svg';
import Login from '@/assets/icons/sidebar/Login.svg';
import Categories from '@/components/categories/Categories';
import MoonLoader from 'vue-spinner/src/MoonLoader';

export default {
  name: 'Sidebar',
  components: { Categories, MoonLoader, Logout, Login },
  data: () => ({
    Logo,
    fire
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
    },

    onAuthClick () {
      this.closeSidebar();
      this.$router.push('/authentication');
      this.$store.dispatch('Sidebar/closeSidebar');
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
    width: 230px;
    overflow: scroll;
    white-space: nowrap;
    padding: 2rem 0 1rem 0; 

    @include tablet {
      width: 250px;
    }

    @include desktop-small {
      width: 300px;
    }

    @include desktop-large {
      width: 400px;
    }

    img {
      width: 2rem;
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
    margin-top: 2rem;
  }

  .bottom {
    padding: 0 1.5rem;

    hr {
      background-color: $clouds;
      height: 1px;
      width: 100%;
      margin: 0 auto;
    }

    .icon {
      padding: 1rem 0.5rem;
      color: $mist !important;

      svg {
        width: 1.8rem;
        fill: $mist;
        margin-right: 0.8rem;
      }
    }
  }
}
</style>
