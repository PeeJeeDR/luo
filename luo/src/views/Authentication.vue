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
            type='email' 
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
            type='email' 
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
import { fire, db } from '@/firebase/firebase';
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
      this.resetForm();
    },

    registerClick () {
      this.formType = 'register';
      this.resetForm();
    },

    resetForm () {
      for (let key in this.loginData) delete this.loginData[key];
      for (let key in this.registerData) delete this.registerData[key];
      for (let key in this.errors) delete this.errors[key];
      this.error = '';
    },

    onFormSubmit () {
      // VALIDATIONS
      this.error = '';

      const validUsername = this.validUsername(this.registerData.username);
      const validPassword = this.validPassword(this.formType === 'login' ? this.loginData.password : this.registerData.password);
      const validEmail = this.validEmail(this.formType === 'login' ? this.loginData.email : this.registerData.email);

      if (validEmail && validPassword) {
        /* === LOGIN === */
        if (this.formType === 'login') {
          const email = this.loginData.email;
          const password = this.loginData.password;

          fire.auth().signInWithEmailAndPassword(email, password).then(res => {
            res.user && this.$router.push('/');
          }).catch(err => {
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
          const username = this.registerData.username;
          const email = this.registerData.email;
          const password = this.registerData.password;
          const repeated = this.registerData.repeatedPassword;

          // IF PASSWORD IS SAME AS REPEATED PASSWORD
          if (password === repeated && validUsername) {
            this.error = '';

            fire.auth().createUserWithEmailAndPassword(email, password).then(res => {
              
              console.log('user res', res.user);
              
              res.user && res.user.updateProfile({ displayName: username }).then(() => {
                db.collection('users').doc(res.user.uid).set({
                  username: res.user.displayName,
                  email: res.user.email,
                  emailVerified: res.user.emailVerified
                }).then(function() {
                  
                }).catch(function(error) {
                  console.log('error', error);
                });
              });

              this.$router.push('/');
            }).catch(err => {
              if (err.code === 'auth/email-already-in-use') {
                this.error = err.message;
              }

              if (err.code === 'auth/argument-error') {
                this.error = 'Please use a valid e-mail address.'
              }
            });
          }

          // IF PASSWORD IS NOT THE SAME AS REPEATED PASSWORD
          if (password !== repeated) {
            this.error = "Passwords doesn't match."
          }
        }
        /* ========== */
      }
    },

    validUsername () {
      return true;
    },

    validEmail (email) {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if (!(reg.test(String(email).toLowerCase()))) {
        this.error = 'Please use a valid e-mail address.';
        return false;
      }

      return reg.test(String(email).toLowerCase());
    },

    validPassword (password) {
      if (password.length <= 6) {
        this.error = 'Password must be longer than 6 characters.';
        return false;
      }

      return true;
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
