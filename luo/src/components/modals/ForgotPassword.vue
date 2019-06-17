<template>
  <div class='forgot-password'>
    <section>
      <h3 class='title heading h--xm h--color-primary'>Enter your e-mail address</h3>
      <input class='default-input' type='email' placeholder='E-mail' v-model='email'>

      <p class='paragraph p--color-danger p--weight-bold p--m p--align-center'>{{ error }}</p>
    </section>

    <default-button :content='"Send password reset"' @click.native='onFormSubmit'/>
  </div>
</template>

<script>
import app from '@/settings/app.json';
import { fire } from '@/firebase/firebase';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'ForgotPassword',
  components: { DefaultButton },
  data: () => ({
    email: '',
    error: ''
  }),
  methods: {
    onFormSubmit () {
      if (this.validEmail(this.email)) {
        fire.auth().sendPasswordResetEmail(this.email)
        .then(() => {
          this.$store.dispatch('Notifications/setNotification', { message: app.notifications.SEND_PASSWORD_FORGOT_SUCCESS });
        })
        .catch(err => {
          this.$store.dispatch('Notifications/setNotification', { message: app.notifications.SEND_PASSWORD_FORGOT_FAIL });
        });

        this.$store.dispatch('Modals/closeModal');
      }
    },

    validEmail (email) {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if (!(reg.test(String(email).toLowerCase()))) {
        this.error = 'Please use a valid e-mail address.';
        return false;
      }

      return reg.test(String(email).toLowerCase());
    }
  }
}
</script>

<style lang='scss' scoped>
.forgot-password
{ 
  p {
    margin-top: 1rem;
  }

  .default-button {
    margin: 3rem auto 0 auto;
  }
}
</style>