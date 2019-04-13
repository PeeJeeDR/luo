<template>
  <div class='authentication page wrapper flex justify-around align-center direction-col'>
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

        <default-button :content='"Login"'/>
        <p>Forgot password?</p>
      </form>
    </div>

    <p class='skip'>Skip login</p>
  </div>
</template>

<script>
import logo from '@/assets/img/Logo@2x.png';
import DefaultInput from '@/components/form/DefaultInput';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'Authentication',
  components: { DefaultInput, DefaultButton },
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
.authentication {
  img {
    width: 4rem;
  }

  .tabs button {
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
    width: 6rem;
    height: 4px;
    background-color: $pinky;
    border: none;
    transition: $quarty;
    border-radius: 2rem;

    &.login {
      margin-left: 0.5rem;
    }

    &.register {
      margin-left: 7.5rem;
    }
  }

  .form-container, form {
    width: 100%;

    form {
      padding-top: 2rem;

      .default-button {
        margin-top: 3rem;
      }

      p {
        font-size: $sansa;
        text-align: center;
        margin-top: 0.8rem;
        font-weight: bold;
        color: $pinky;
      }
    }
  }

  .skip {
    color: $pinky;
    font-weight: bold;
    font-size: $ned;
  }
}
</style>
