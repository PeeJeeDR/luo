<template>
  <carousel 
    :per-page='1' 
    class='quiz-options-modal default-modal' 
    :paginationEnabled='false' 
    :adjustableHeight='true'
  >
    <!-- === TITLE, DESCRIPTION AND PUBLIC === -->
    <slide data-index='0'>
      <h3 class='heading h--xxm h--color-primary'>Almost done!</h3>

      <form @submit.prevent='onFormSubmit'>
        <input type='text' class='default-input' placeholder='Quiz title' v-model='title'>
        <textarea class='default-input textarea' placeholder='Quiz description' v-model='description'></textarea>

        <div class='public flex align-center'>
          <check-mark @click.native='togglePrivate' :checked='public'/>
          <h2 class='heading h--m'>Make quiz public</h2>
        </div>
      
        <submit-and-cancel @onsubmit='onFormSubmit' @oncancel='$store.dispatch("Modals/closeModals")'/>
      </form>
    </slide>
    <!-- ========== -->

    <!-- === CATEGORIES === -->
    <slide data-index='1'>
      <h3 class='heading h--xxm h--color-primary'>Select categories</h3>

      <div class='categories'>
        <div class='category flex align-center' v-for='(category, i) in categories' :key='i'>
          <check-mark @click.native='categorySelect(category.id)' :checked='selectedCategories.includes(category.id)'/>
          <img :src='require(`@/assets/icons/categories/${ category.slug }.png`)' :alt='`${ capFirstChar(category.category) } icon.`'>
          <h2 class='heading h--m'>{{ category.category }}</h2>
        </div>
      </div>

      <submit-and-cancel @onsubmit='onFormSubmit' @oncancel='$store.dispatch("Modals/closeModals")'/>
    </slide>
    <!-- ========== -->

    <!-- === IMAGE UPLOAD === -->
    <slide data-index='2'>
      <h3 class='heading h--xxm h--color-primary'>Select a quiz image!</h3>

      <div class='image-container'>
        <img v-if='selectedImgURL !== ""' :src='selectedImgURL' alt='img'>

        <div class='icons flex justify-center align-end'>
          <input type='file' ref='img' style='display: none' @change='onImgSelect'>

          <div :class='`icon flex-center ${ selectedImgURL !== "" && "active" }`' @click='$refs.img.click()'>
            <gallery/>
          </div>
        </div>
      </div>

      <submit-and-cancel @onsubmit='onFormSubmit' @oncancel='$store.dispatch("Modals/closeModals")'/>
    </slide>
    <!-- ========== -->
  </carousel>
</template>

<script>
import { mapState } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import GlobalMethods from '@/mixins/GlobalMethods';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';
import Gallery from '@/assets/icons/quizzes/Gallery.svg';

export default {
  name: 'quizOptionsModal',
  mixins: [GlobalMethods],
  components: { CheckMark, SubmitAndCancel, Carousel, Slide, Gallery, CheckMark },
  data: () => ({
    title: '',
    description: '',
    public: false,
    selectedImgURL: '',
    selectedCategories: []
  }),
  computed: {
    ...mapState('Categories', ['categories'])
  },
  created () {
    this.$store.dispatch('Categories/fetchCategories');
  },
  methods: {
    /* === TITLE, DESCRIPTION AND PUBLIC === */
    togglePrivate () {
      this.public = !this.public;
    },
    /* ========== */

    /* === ASSETS UPLOAD === */
    onImgSelect (e) {
      if (e.target.files[0] && e.target.files[0].type.includes('image')) {
        this.selectedImgURL = URL.createObjectURL(e.target.files[0]);
      }
    },
    /* ========== */

    /* === CATEGORIES === */
    categorySelect (categoryId) {
      if (this.selectedCategories.includes(categoryId)) {
        let index = this.selectedCategories.indexOf(categoryId);
        index > -1 && this.selectedCategories.splice(index, 1);
      } 
      else {
        this.selectedCategories.push(categoryId);
      }
    },
    /* ========== */

    /* === FORM SUBMIT === */
    async onFormSubmit () {
      console.log('post');
      await this.$store.dispatch('Quizzes/postNewQuiz', {
        title: this.title,
        description: this.description,
        public: this.public,
        categories: this.selectedCategories
      });

      this.$store.dispatch('Modals/closeModals');
      this.$router.push('/');
    }
    /* ========== */
  }
}
</script>

<style lang='scss' scoped>
.quiz-options-modal {
  padding: 2rem 0;

  .public {
    padding-top: 1rem;
  }

  .categories {
    height: 20rem;
    overflow: scroll;
    margin: -1rem 0;

    .category {
      margin: 1rem 0;

      img {
        width: 2rem;
        margin-right: 1rem;
      }
    }
  }
}
</style>
