<template>
  <div class='page wrapper flex justify-center align-center direction-col'>
    <img :src='logo' alt='Logo of Luo.'>

    <div class="form-container flex direction-col align-center">
      <div class="tabs">
        <button :class='active === "login" && "active"' @click='active = "login"'>Login</button>
        <button :class='active === "register" && "active"' @click='active = "register"'>Register</button>
        <hr :class='active'>
      </div>

      <form>
        <default-input :placeholder='"Username"'/>
        <default-input :placeholder='"Password"'/>
      </form>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/Logo@2x.png';
import DefaultInput from '@/components/form/DefaultInput';

export default {
  name: 'Authentication',
  components: { DefaultInput },
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

.form-container, form {
  width: 100%;

  .tabs {
    padding-top: 6rem;
  }

  form {
    padding-top: 2rem;
  }
}
</style>
