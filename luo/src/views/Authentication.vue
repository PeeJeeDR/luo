<template>
  <div class='page wrapper flex justify-center align-center direction-col'>
    <img :src='logo' alt='Logo of Luo.'>

    <div class="form-container">
      <div class="tabs">
        <button :class='active === "login" && "active"' @click='active = "login"'>Login</button>
        <button :class='active === "register" && "active"' @click='active = "register"'>Register</button>
        <hr :class='active'>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/Logo@2x.png';
import DefaultInput from '@/components/form/DefaultInput';

export default {
  name: 'Authentication',
  data: () => ({
    logo,
    active: 'login'
  }),
  beforeMount () {
    this.$store.dispatch('Header/hideHeader');
  },
  methods: {
    toHome () {
      this.$router.push('/');
    }
  }
}
</script>

<style lang='scss' scoped>
img {
  width: 4rem;
}

button {
  background: none;
  border: none;
  width: 4rem;
  padding-bottom: 0.5rem;
  margin: 0 1.5rem;
  color: $clouds;
  outline: none;
  font-weight: bold;
  transition: $easy;
  font-size: $bran;

  &.active {
    color: $texty;
  }
}

hr {
  width: 5rem;
  height: 4px;
  background-color: $pinky;
  border: none;
  transition: $quarty;
  border-radius: 2rem;

  &.login {
    margin-left: 1rem;
  }

  &.register {
    margin-left: 8rem;
  }
}
</style>
