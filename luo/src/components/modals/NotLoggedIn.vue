<template>
  <div class='not-logged-in'>
    <section>
      <h3 class='title heading h--xm h--color-primary'>Oops!</h3>
      <p>
        You need to be logged in to create quizzes.
      </p>
    </section>

    <section>
      <default-button :content='"Login"' @click.native='openAuthentication'/>
    </section>
  </div>
</template>

<script>
import app from '@/settings/app.json';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'NotLoggedIn',
  components: { DefaultButton },
  methods: {
    openAuthentication () {
      try {
        this.$router.push('/authentication');
      }
      catch (err) {
        this.$store.dispatch('Notifications/setNotification', { message: app.notifications.GENERAL_ERROR });
      }

      this.$store.dispatch('Modals/closeModal');
    }
  }
}
</script>

<style lang='scss' scoped>
.not-logged-in
{
  
}
</style>