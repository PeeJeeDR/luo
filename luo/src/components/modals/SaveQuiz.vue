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

          <div v-if='!isInitialQR' class='settings flex-center'>
            <div class='setting flex align-center' @click='onPublicClick'>
              <check-mark :checked='formData.isPublic'/>
              <h2 class='heading h--m'>Make quiz public</h2>
            </div>

            <div class='setting flex align-center' @click='onQRClick'>
              <check-mark :checked='formData.isQRQuiz'/>
              <h2 class='heading h--m'>Make QR code quiz</h2>
            </div>
          </div>
        </section>

        <!-- Image. -->
        <section>
          <media-uploader 
            :img='true' 
            :audio='false' 
            :formData='formData' 
            :type='"quiz"'
            @onImgUpload='setImage'
          />
        </section>

        <default-button :content='"Next"' @click.native='nextSlide("quiz-1-2")'/>
      </div>

      <!-- Categories. -->
      <div key='2' v-if='selectedSlide === 1'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>Select categories</h3>
          <div class='categories'>
            <div class='category' v-for='category in categories' :key='category.slug' @click='categorySelect(category)'>
              <div v-if='category.slug !== "suggest"' class='flex align-center'>
                <check-mark :checked='shouldCategoryChecked(category)'/>
                <img :src='require(`@/assets/icons/categories/${ category.slug }.png`)' :alt='`${ capFirstChar(category.category) } icon.`'>
                <h2 class='heading h--m'>{{ category.category }}</h2>
              </div>
            </div>
          </div>
        </section>

        <p class='paragraph p--m p--color-danger p--weight-bold p--align-center error'>{{ error }}</p>

        <default-button :content='"Submit"' @click.native='onFormSubmit'/>
      </div>
    </transition>
  </div>
</template>

<script>
import { fire } from '@/firebase/firebase';
import { mapState } from 'vuex';
import clonedeep from 'lodash.clonedeep';
import GlobalMethods from '@/mixins/GlobalMethods';
import ModalMixins from '@/mixins/ModalMixins';
import DefaultButton from '@/components/buttons/DefaultButton';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';
import MediaUploader from '@/components/media/MediaUploader';

export default {
  /* === ModalMixins.js ===
  - selectedSlide (data)
  - nextSlide (method)
  - prevSlide (method)
  ========== */

  name: 'SaveQuiz',
  mixins: [GlobalMethods, ModalMixins],
  components: { DefaultButton, CheckMark, SubmitAndCancel, MediaUploader },
  data: () => ({
    formData: {},
    isInitialQR: false
  }),
  computed: {
    ...mapState('Categories', ['categories']),
    ...mapState('CreateQuiz', ['quiz'])
  },
  created () {
    this.formData = clonedeep(this.quiz);

    if (this.formData.isQRQuiz) {
      this.isInitialQR = true;
    }
  },
  methods: {
    onPublicClick () {
      this.formData.isPublic = !this.formData.isPublic;

      if (this.formData.isPublic) {
        this.formData.isQRQuiz = false;
      }
    },

    onQRClick () {
      this.formData.isQRQuiz = !this.formData.isQRQuiz;

      if (this.formData.isQRQuiz) {
        this.formData.isPublic = false;
      }
    },

    setImage (output) {
      this.formData.quizImg = output;
    },

    getQuizImgSource () {
      if (this.formData.quizImg === '') {
        return require(`@/assets/img/samples/categories/${ this.formData.quizSample }.jpg`);
      }

      if (this.formData.quizSample === '') {
        return this.formData.quizImg;
      }
    },

    categorySelect (category) {
      let filtered = [];

      this.formData.categories.forEach(category => {
        typeof category === 'object' ? filtered.push(category.slug) : filtered.push(category);
      });

      if (filtered.indexOf(category.slug) > -1) {
        let index = filtered.indexOf(category.slug);
        this.formData.categories.splice(index, 1);
      } 
      else {
        this.error = '';
        this.formData.categories.push(category);
      }
    },

    shouldCategoryChecked (category) {
      return this.formData.categories.indexOf(category.slug) > -1 || this.formData.categories.indexOf(category) > -1;
    },

    onFormSubmit () {
      if (this.formData.categories.length === 0) {
        this.error = 'Select at least one category.';
      }

      if (this.formData.categories.length > 0) {
        if (this.formData.quizImg === '' && this.formData.quizSample === '') {
          const randomCategory = this.formData.categories[Math.floor(Math.random() * (this.formData.categories.length - 0) + 0)].slug;
          const quizSample = `${ randomCategory }/${ Math.floor(Math.random() * (3 - 1) + 1) }`;
          
          this.formData.quizSample = quizSample;
        }

        let categorySlugs = this.formData.categories.map(category => { 
          if (category.slug !== undefined) {
            return category.slug;
          }

          if (category.slug === undefined) {
            return category;
          }
        });

        this.formData.categories = categorySlugs;
        this.$store.dispatch('CreateQuiz/onQuizFormSubmit', { quiz: this.formData });
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.save-quiz
{
  textarea {
    height: 8rem !important;
    margin-top: 0rem;
  } 

  .public {
    margin-top: 1rem;
  }

  .categories {
    height: 20rem;
    overflow: scroll;
    margin: 1rem 0 4rem 0;

    .category {
      margin: 1.5rem 0;

      img {
        width: 2rem;
        height: 100%;
        margin-right: 1rem;
      }
    }
  }

  .error {
    margin-top: 1rem;
  }

  .default-button {
    margin: 0 auto;
    width: 49%;

    @include phone-small {
      width: 102%;
    }
  }
}
</style>