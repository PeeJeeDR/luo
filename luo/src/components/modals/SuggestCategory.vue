<template>
  <div class='SuggestCategory'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
      <div>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Suggest category</h3>
          <input class='default-input' v-model='category' type='text' placeholder='category'>
        </section>

        <submit-and-cancel @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='onFormSubmit'/>
      </div>
    </transition>
  </div>
</template>

<script>
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  name: 'SuggestCategory',
  components: { SubmitAndCancel },
  data: () => ({
    category: ''
  }),
  methods: {
    onFormSubmit () {
      this.$store.dispatch('Categories/onCategorySuggestion', { input: this.category });
    }
  }
}
</script>

<style lang='scss' scoped>
.SuggestCategory
{
  
}
</style>