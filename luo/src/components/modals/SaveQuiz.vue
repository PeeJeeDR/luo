<template>
  <div class='save-quiz'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>

      <!-- Title, description and image. -->
      <div key='1' v-if='selectedSlide === 0'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Name and description</h3>
          <input class='default-input' type='text' placeholder='Quiz title' v-model='formData.title'>
          <p class='paragraph p--s p--color-danger p--weight-bold error'>{{ error }}</p>
          <textarea class='default-input textarea' placeholder='Quiz description' v-model='formData.description'></textarea>
          <p class='paragraph p--s p--color-danger p--weight-bold error'>{{ error1 }}</p>

          <div v-if='shouldPublicRender()' class='public flex align-center' @click='togglePublic'>
            <check-mark :checked='formData.isPublic'/>
            <p class='paragraph p--m p--weight-bold p--color-lighter'>Make quiz public</p>
          </div>
        </section>

        <!-- Image. -->
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

          <img v-if='formData.quizImg !== ""' :src='formData.quizImg' alt='Uploaded file.' @click='$refs.img.click()'>
          <default-button v-if='formData.quizImg === ""' :content='"Add quiz image"' @click.native='$refs.img.click()'/>
        </section>

        <submit-and-cancel :includeBack='false' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='nextSlide("quiz-1-2")'/>
      </div>

      <!-- Categories. -->
      <div key='2' v-if='selectedSlide === 1'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Categories</h3>
          <div class='categories'>
            <div class='category flex align-center' v-for='category in categories' :key='category.id' @click='categorySelect(category.id)'>
              <check-mark :checked='selectedCategories.includes(category.id) || (quizToBeEdited !== undefined && quizToBeEdited.categories.includes(category.id))'/>
              <img :src='require(`@/assets/icons/categories/${ category.slug }.png`)' :alt='`${ capFirstChar(category.category) } icon.`'>
              <h2 class='heading h--m'>{{ category.category }}</h2>
            </div>
          </div>
        </section>

        <p class='paragraph p--s p--color-danger p--weight-bold error'>{{ error }}</p>

        <submit-and-cancel :includeBack='true' @onback='prevSlide' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='onFormSubmit'/>
      </div>
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
      quizImg: '',
      isPublic: true
    },
    selectedCategories: []
  }),
  computed: {
    ...mapState('Categories', ['categories']),
    ...mapState('CreateQuiz', ['isQRQuiz', 'editMode', 'quizToBeEdited'])
  },
  created () {
    this.$store.dispatch('Categories/fetchCategories');

    if (this.editMode) {
      this.formData = this.quizToBeEdited;
    }
  },
  methods: {
    // Toggle public state.
    togglePublic () {
      this.formData.isPublic = !this.formData.isPublic;
    },

    // Should the public check mark render?
    shouldPublicRender () {
      if (this.editMode && !this.quizToBeEdited.isQRQuiz) {
        return true;
      }

      if (!this.editMode && !this.isQRQuiz) {
        return true;
      }

      return false;
    },
    
    // Set the quiz image.
    setImage (output) {
      this.formData.quizImg = output;
    },

    // On category select when saving a quiz. It is possible to select multiple categories.
    categorySelect (categoryId) {
      if (this.selectedCategories.includes(categoryId)) {
        let index = this.selectedCategories.indexOf(categoryId);
        index > -1 && this.selectedCategories.splice(index, 1);
      } 
      else {
        this.selectedCategories.push(categoryId);
      }
    },

    // When submitted on the category page. Checks if there is at least one category selected.
    onFormSubmit () {
      if (!this.editMode && this.selectedCategories.length === 0) {
        this.error = 'Select at least one category.';
        return;
      }

      if (this.editMode && this.quizToBeEdited.categories.length === 0) {
        this.error = 'Select at least one category.';
        return;
      }

      this.error = '';
      this.formData.userId = fire.auth().currentUser.uid;

      if (!this.editMode) {
        this.formData.categories = this.selectedCategories;
      }

      if (this.editMode) {
        this.formData.categories = this.quizToBeEdited.categories;
      }

      // Generate random category.
      let selectedCategories = [];

      this.selectedCategories.forEach(selected => {
        this.categories.forEach(category => {
          category.id === selected && selectedCategories.push(category);
        });
      });

      const randomNbr = Math.floor(Math.random() * (selectedCategories.length - 0) + 0);
      const slug = selectedCategories[randomNbr].slug;
      const quizSample = `${ slug }/${ Math.floor(Math.random() * (3 - 1) + 1) }`;

      if (this.formData.quizImg === '') {
        this.formData.quizSample = quizSample;
      }

      if (this.formData.quizImg !== '') {
        this.formData.quizSample = '';
      }

      if (!this.editMode) {
        // Post new quiz.
        this.$store.dispatch('Quizzes/postNewQuiz', { 
          quiz: this.formData
        }).then(() => {
          // Clear questions array in the store.
          this.$store.dispatch('CreateQuiz/onNewQuizPost');

          // Close the modal.
          this.$store.dispatch('Modals/closeModal');

          // Route user to the overview page.
          this.$router.push('/');
        });
      }

      if (this.editMode) {
        this.$store.dispatch('Quizzes/updateQuiz', { quiz: this.formData });
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.save-quiz
{
  .public {
    margin-top: 1rem;
  }

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