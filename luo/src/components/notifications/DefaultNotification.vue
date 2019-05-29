<template>
  <div class='default-notification flex-center'>
    <p class='paragraph p--m p--weight-bold p--color-light'>You need to be logged in to add quizzes.</p>
  </div>
</template>

<script>
export default {
  name: 'DefaultNotification',
}
</script>

<style lang='scss' scoped>
.default-notification
{
  position: fixed;
  bottom: 5rem; left: 0; right: 0;
  z-index: 5;

  p {
    background-color: rgba($storm, 0.9);
    padding: 0.8rem 1.2rem;
    border-radius: 20rem;
  }
}
</style>