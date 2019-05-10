<template>
  <div class='quiz-options-modal default-modal'>
    <h3 class='heading h--xxm h--color-primary'>Almost done!</h3>

    <form @submit.prevent='onFormSubmit'>
      <input type='text' class='default-input' placeholder='Quiz title' v-model='title'>
      <textarea class='default-input textarea' placeholder='Quiz description' v-model='description'></textarea>

      <div class='public flex align-center'>
        <check-mark @click.native='togglePrivate' :checked='public'/>
        <h2 class='heading h--m'>Make quiz public</h2>
      </div>
     
      <submit-and-cancel @oncancel='$store.dispatch("Modals/closeModals")'/>
    </form>
  </div>
</template>

<script>
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  name: 'quizOptionsModal',
  components: { CheckMark, SubmitAndCancel },
  data: () => ({
    title: '',
    description: '',
    public: false
  }),
  methods: {
    togglePrivate () {
      this.public = !this.public;
    },

    async onFormSubmit () {
      await this.$store.dispatch('Quizzes/postNewQuiz', {
        title: this.title,
        description: this.description,
        public: this.public
      });

      this.$store.dispatch('Modals/closeModals');
      this.$router.push('/');
    }
  }
}
</script>

<style lang='scss' scoped>
.quiz-options-modal {
  .public {
    padding-top: 1rem;
  }
}
</style>
