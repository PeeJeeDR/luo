<template>
  <div class='save-quiz'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>

      <!-- === TITLE DESCRIPTION AND IMAGE === -->
      <div key='1' v-if='selectedSlide === 0'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Name and description</h3>
          <input class='default-input' type='text' placeholder='Quiz title' v-model='formData.title'>
          <textarea class='default-input textarea' placeholder='Quiz description' v-model='formData.description'></textarea>
        </section>

        <!-- === IMAGE === -->
        <section>
          <image-uploader
            style='display: none'
            :debug='1'
            :maxWidth='512'
            :quality='0.7'
            :autoRotate='true'
            outputFormat='string'
            :preview='true'
            capture='environment'
            accept='image/*'
            doNotResize='["gif", "svg"]'
            @input='setImage'
          >
            <label for='fileInput' ref='img' slot='upload-label'></label>
          </image-uploader>

          <img v-if='formData.quizImg !== ""' :src='formData.quizImg' :alt='"Uploaded file."' @click='$refs.img.click()'>
          <default-button v-if='formData.quizImg === ""' :content='"Add quiz image"' @click.native='$refs.img.click()'/>
        </section>
        <!-- ========== -->

        <submit-and-cancel :includeBack='false' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='nextSlide("quiz-1-2")'/>
      </div>
      <!-- ========== -->

      <!-- === CATEGORIES === -->
      <div key='2' v-if='selectedSlide === 1'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Categories</h3>
          <div class='categories'>
            <div class='category flex align-center' v-for='category in categories' :key='category.id' @click='categorySelect(category.id)'>
              <check-mark :checked='selectedCategories.includes(category.id)'/>
              <img :src='require(`@/assets/icons/categories/${ category.slug }.png`)' :alt='`${ capFirstChar(category.category) } icon.`'>
              <h2 class='heading h--m'>{{ category.category }}</h2>
            </div>
          </div>
        </section>

        <submit-and-cancel :includeBack='true' @onback='prevSlide' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='onFormSubmit'/>
      </div>
      <!-- ========== -->

    </transition>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import GlobalMethods from '@/mixins/GlobalMethods';
import ModalMixins from '@/mixins/ModalMixins';
import DefaultButton from '@/components/buttons/DefaultButton';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  name: 'SaveQuiz',
  mixins: [GlobalMethods, ModalMixins],
  components: { DefaultButton, CheckMark, SubmitAndCancel },
  data: () => ({
    formData: {
      title: '',
      description: '',
      categories: [],
      quizImg: ''
    },
    selectedCategories: []
  }),
  computed: {
    ...mapState('Categories', ['categories'])
  },
  created () {
    this.$store.dispatch('Categories/fetchCategories');
  },
  methods: {
    /* === IMAGES === */
    setImage (output) {
      console.log('OUTPUT', output);
      this.formData.quizImg = output;
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

    /* === ON FORM SUBMIT === */
    onFormSubmit () {
      this.formData.categories = this.selectedCategories;
      this.formData.userId = fire.auth().currentUser.uid;

      this.$store.dispatch('Quizzes/postNewQuiz', this.formData).then(() => {
        this.$store.dispatch('Modals/closeModal');
        this.$router.push('/');
      });
    }
    /* ========== */
  }
}
</script>

<style lang='scss' scoped>
.save-quiz
{
  .categories {
    height: 20rem;
    overflow: scroll;

    .category {
      margin: 1rem 0;

      img {
        width: 2rem;
        height: 100%;
        margin-right: 1rem;
      }
    }
  }
}
</style>