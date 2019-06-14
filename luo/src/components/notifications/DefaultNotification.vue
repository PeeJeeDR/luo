<template>
  <div class='default-notification flex-center wrapper'>
    <p class='paragraph p--m p--weight-bold p--color-light'>{{ notification }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DefaultNotification',
  computed: {
    ...mapState('Notifications', ['notification'])
  }
}
</script>

<style lang='scss' scoped>
.default-notification
{
  position: fixed;
  bottom: 6rem; left: 0; right: 0;
  z-index: 5;

  p {
    background-color: rgba($storm, 0.9);
    padding: 0.8rem 1.2rem;
    border-radius: 20rem;
  }
}
</style>