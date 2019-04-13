<template>
  <div class='authentication page wrapper flex justify-around align-center direction-col'>
    <img :src='logo' alt='Logo of Luo.'>

    <div class="form-container flex direction-col align-center">
      <div class="tabs">
        <button :class='formType === "login" && "active"' @click='formType = "login"'>Login</button>
        <button :class='formType === "register" && "active"' @click='formType = "register"'>Register</button>
        <hr :class='formType'>
      </div>

      <form @submit.prevent='onFormSubmit'>
        <div v-if='formType === "login"'>
          <default-input type='text' :placeholder='"Username"' v-model='loginData.username'/>
          <default-input type='password' :placeholder='"Password"' v-model='loginData.password'/>
        </div>

        <div v-if='formType === "register"'>
          <default-input type='text' :placeholder='"Username"' v-model='registerData.username'/>
          <default-input type='email' :placeholder='"E-mail"' v-model='registerData.email'/>
          <default-input type='password' :placeholder='"Password"' v-model='registerData.password'/>
          <default-input type='password' :placeholder='"Repeat password"' v-model='registerData.repeatedPassword'/>
        </div>

        <default-button :content='"Login"'/>
        <p>Forgot password?</p>
      </form>
    </div>

    <p class='skip'>Skip login</p>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import logo from '@/assets/img/Logo@2x.png';
import DefaultInput from '@/components/form/DefaultInput';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'Authentication',
  components: { DefaultInput, DefaultButton },
  data: () => ({
    logo,
    formType: 'login',
    loginData: {
      username: '',
      password: ''
    },
    registerData: {
      username: '',
      email: '',
      password: '',
      repeatedPassword: ''
    }
  }),
  beforeMount () {
    this.$store.dispatch('Header/hideHeader');
  },
  methods: {
    onFormSubmit () {
      if (this.formType === 'login') {
        console.log(this.loginData);
      }
      
      if (this.formType === 'register') {
        const email = this.registerData.email;
        const password = this.registerData.password;
        fire.auth().createUserWithEmailAndPassword(email, password).catch(err => {
          console.log('auth error', err);
        });
      }
    },

    validUsername () {
      // CHECK IF USER NOT EXISTS
    },

    validEmail () {
      // CHECK IF EMAIL IS VALID
    },

    validPassword () {
      // CHECK IF PASSWORDS ARE THE SAME
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
