<template>
  <div class='authentication wrapper flex justify-start align-center direction-col'>
    <img :src='Logo' alt='Logo of Luo.'>

    <div class="form-container flex direction-col align-center">
      <div class="tabs">
        <button :class='formType === "login" && "active"' @click='loginClick'>Login</button>
        <button :class='formType === "register" && "active"' @click='registerClick'>Register</button>
        <hr :class='formType'>
      </div>

      <!-- Login. -->
      <form v-if='formType === "login"' @submit.prevent='onFormSubmit'>
        <div>
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

        <p class='paragraph p--color-danger p--weight-bold p--m p--align-center'>{{ error }}</p>
        <default-button :content='"login"' :loading='loading'/>
      </form>

      <!-- Register. -->
      <form v-if='formType === "register"' @submit.prevent='onFormSubmit'>
        <div>
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
        
        <p class='paragraph p--color-danger p--weight-bold p--m p--align-center'>{{ error }}</p>
        <default-button :content='"Register"' :loading='loading'/>
      </form>

      <!-- Error, forgot password and skip login. -->
      <p class='paragraph p--color-primary p--weight-bold p--s' v-if='formType === "login"' @click='onPasswordForgot'>Forgot password?</p>
      <p class='skip paragraph p--color-primary p--weight-bold p--l p--hover-enabled' @click='onSkipClick'>Skip login</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { fire, db } from '@/firebase/firebase';
import app from '@/settings/app.json';
import Logo from '@/assets/img/logo/Logo.png';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'Authentication',
  components: { DefaultButton },
  data: () => ({
    Logo,
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
    error: '',
    loading: false
  }),
  created () {
    window.scrollTo(0,0);

    this.$store.dispatch('Users/onAppLoad');

    // Reset some variables in the store.
    this.$store.dispatch('Quizzes/onAuthLoad');
  },
  methods: {
    loginClick () {
      this.formType = 'login';
      this.resetForm();
    },

    registerClick () {
      this.formType = 'register';
      this.resetForm();
    },

    onPasswordForgot () {
      this.$store.dispatch('Modals/openModal', { type: 'forgot-password' });
    },

    onSkipClick () {
      this.$store.dispatch('Notifications/setNotification', { message: app.notifications.GUEST_MODE });
      this.$router.push('/');
    },

    resetForm () {
      for (let key in this.loginData) delete this.loginData[key];
      for (let key in this.registerData) delete this.registerData[key];
      for (let key in this.errors) delete this.errors[key];
      this.error = '';
    },

    onFormSubmit () {
      // Validations
      this.error = '';

      const validUsername = this.validUsername(this.registerData.username);
      const validPassword = this.validPassword(this.formType === 'login' ? this.loginData.password : this.registerData.password);
      const validEmail = this.validEmail(this.formType === 'login' ? this.loginData.email : this.registerData.email);

      if (validEmail && validPassword) {
        // Login.
        if (this.formType === 'login') {
          const email = this.loginData.email;
          const password = this.loginData.password;

          this.loading = true;

          fire.auth().signInWithEmailAndPassword(email, password).then(res => {
            if (res.user) {
              this.$store.dispatch('Notifications/setNotification', { message: app.notifications.LOGIN_USER_SUCCESS });
              this.loading = false;
              this.$router.push('/');
            }
          }).catch(err => {
            this.loading = false;

            if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
              this.error = 'Password or email address is wrong.';
            }

            if (err.code === 'auth/invalid-email') {
              this.error = 'Please use a valid e-mail address.';
            }

            if (err.code === 'auth/network-request-failed') {
              this.$store.dispatch('Notifications/setNotification', { message: app.notifications.SERVER_CONNECTION_FAIL });
            }            
          });
        }
      
        // Register.
        if (this.formType === 'register') {
          const username = this.registerData.username;
          const email = this.registerData.email;
          const password = this.registerData.password;
          const repeated = this.registerData.repeatedPassword;

          // If password is the same as the repeated password.
          if (password === repeated && validUsername) {
            this.error = '';
            this.loading = true;

            // Create a new user.
            fire.auth().createUserWithEmailAndPassword(email, password).then(res => {       
              res.user && res.user.updateProfile({ 
                displayName: username,
                photoURL: undefined, // Default avatar.
              })
              .then(() => {
                db.collection('users').doc(res.user.uid).set({
                  username: res.user.displayName,
                  email: res.user.email,
                  emailVerified: res.user.emailVerified,
                  reputation: 0,
                  badges: [],
                  avatar: Math.floor(Math.random() * (12 - 1) + 1),
                  avatarUrl: null,
                  xp: 0,
                  followers: [],
                  created: moment().format()
                })
                .then(() => {
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                  this.$store.dispatch('Notifications/setNotification', { message: app.notifications.REGISTER_USER_FAIL });
                });
              })
              .catch(() => {
                this.loading = false;
              });

              this.$store.dispatch('Notifications/setNotification', { message: app.notifications.REGISTER_USER_SUCCESS });
              this.$router.push('/');
            }).catch(err => {
              if (err.code === 'auth/email-already-in-use') {
                this.error = err.message;
              }

              if (err.code === 'auth/argument-error') {
                this.error = 'Please use a valid e-mail address.'
              }

              if (err.code === 'auth/network-request-failed') {
                this.$store.dispatch('Notifications/setNotification', { message: app.notifications.SERVER_CONNECTION_FAIL });
              }  
            });
          }

          // If password is NOT the same as the repeated password.
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
      if (password && password.length <= 6) {
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
  width: 80%;
  position: relative;

  @include tablet {
    width: 30rem;
  }

  @include desktop {
    width: 30rem;
  }

  img {
    padding-top: 5rem;
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
    transition: all $fast ease-in-out;
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

  .form-container {
    width: 100%;

    form {
      width: inherit;
      padding-top: 2rem;

      p {
        margin: 1rem 0;
      }

      .default-button {
        margin: 1rem 0 1rem 0;
      }
    }

    p.skip {
      margin: 4rem 0;
    }
  }
}
</style>
