<template>
  <div class='authentication page wrapper flex justify-start align-center direction-col'>
    <img :src='logo' alt='Logo of Luo.'>

    <div class="form-container flex direction-col align-center">
      <div class="tabs">
        <button :class='formType === "login" && "active"' @click='loginClick'>Login</button>
        <button :class='formType === "register" && "active"' @click='registerClick'>Register</button>
        <hr :class='formType'>
      </div>

      <form @submit.prevent='onFormSubmit'>
        <!-- === LOGIN === -->
        <div v-if='formType === "login"'>
          <input 
            class='default-input' 
            type='text' 
            v-model='loginData.email'
            placeholder='E-mail'
          >
          <input 
            class='default-input' 
            type='password' 
            v-model='loginData.password'
            placeholder='Password'
          >
        </div>
        <!-- ========== -->

        <!-- === REGISTER === -->
        <div v-if='formType === "register"'>
          <input 
            class='default-input' 
            type='text' 
            v-model='registerData.username'
            placeholder='Username'
          >
          <input 
            class='default-input' 
            type='text' 
            v-model='registerData.email'
            placeholder='E-mail'
          >
          <input 
            class='default-input' 
            type='password' 
            v-model='registerData.password'
            placeholder='Password'
          >
          <input 
            class='default-input' 
            type='password' 
            v-model='registerData.repeatedPassword'
            placeholder='Repeat password'
          >
        </div>
        <!-- ========== -->

        <p class='error'>{{ error }}</p>
        <default-button :content='"Login"'/>
        <p>Forgot password?</p>
        <p class='skip'>Skip login</p>
      </form>
    </div>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import logo from '@/assets/img/Logo@2x.png';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'Authentication',
  components: { DefaultButton },
  data: () => ({
    logo,
    formType: 'login',
    loginData: {
      email: '',
      password: ''
    },
    registerData: {
      username: '',
      email: '',
      password: '',
      repeatedPassword: ''
    },
    error: ''
  }),
  methods: {
    loginClick () {
      this.formType = 'login';
      this.resetData();
    },

    registerClick () {
      this.formType = 'register';
      this.resetData();
    },

    resetData () {
      for (var key in this.loginData) delete this.loginData[key];
      for (var key in this.registerData) delete this.registerData[key];
      for (var key in this.errors) delete this.errors[key];
      this.error = '';
    },

    onFormSubmit () {
      /* === LOGIN === */
      if (this.formType === 'login') {
        const email = this.loginData.email;
        const password = this.loginData.password;

        fire.auth().signInWithEmailAndPassword(email, password).then(res => {
          if (res.user) {
            // IF LOGGED IN
            this.$router.push('/');
          }
        }).catch(err => {
          console.log('login err', err);
          if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            this.error = 'Password or email address is wrong.';
          }

          if (err.code === 'auth/invalid-email') {
            this.error = 'Pleas use a valid e-mail address.';
          }
        });
      }
      /* ========== */
      
      /* === REGISTER === */
      if (this.formType === 'register') {
        const email = this.registerData.email;
        const password = this.registerData.password;
        const repeated = this.registerData.repeatedPassword;

        // ONLY IF PASSWORD IS SAME AS REPEATED PASSWORD
        if (password === repeated) {
          fire.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            console.log('register succes');

            // this.$router.push('/');
          }).catch(err => {
            console.log('register error', err);
            if (err.code === 'auth/email-already-in-use') {
              console.log('email error');
              this.error = err.message;
            }
          });
        }

        // IF PASSWORD IS NOT THE SAME AS REPEATED PASSWORD
        if (password !== repeated) {
          this.error = "Passwords doesn't match"
        }
      }
      /* ========== */
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
    padding-top: 4rem;
    width: 4rem;
  }

  .tabs button {
    padding-top: 4rem;
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

      p.error {
        color: $lava;
        height: 1rem;
      }

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

    .skip {
      color: $pinky;
      font-weight: bold;
      font-size: $ned;
      bottom: 5rem;
      padding-top: 3rem;
      padding-bottom: 4rem;
    }
  }
}
</style>
