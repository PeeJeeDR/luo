<template>
  <div class='create-quiz-confirm'>
    <section>
      <h3 class='title heading h--xm h--color-primary'>Quit editing?</h3>
      <p>
        You have made some changes to this quiz.
        Are you sure you want to leave?
      </p>
    </section>

    <section>
      <default-button :content='"Stay"' @click.native='onYesPress'/>
      <default-button :content='"Leave"' @click.native='onNoPress'/>
    </section>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'CreateQuizConfirm',
  components: { DefaultButton },
  methods: {
    onYesPress () {
      this.$store.dispatch('Modals/onConfirmAnswerSelect', { confirmAnswer: 'stay' });
    },

    onNoPress () {
      this.$store.dispatch('Modals/onConfirmAnswerSelect', { confirmAnswer: 'leave' });
    }
  }
}
</script>