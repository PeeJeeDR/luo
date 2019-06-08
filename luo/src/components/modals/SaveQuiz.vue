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

          <div v-if='formData.isQRQuiz' class='public flex align-center' @click='formData.isPublic = !formData.isPublic'>
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

          <default-button v-if='formData.quizImg === "" && formData.sampleImg === ""' :content='"Add quiz image"' @click.native='$refs.img.click()'/>
          <img v-else :src='getQuizImgSource()' alt='Uploaded file.' @click='$refs.img.click()'>
        </section>

        <submit-and-cancel :includeBack='false' @oncancel='$store.dispatch("Modals/closeModal")' @onsubmit='nextSlide("quiz-1-2")'/>
      </div>

      <!-- Categories. -->
      <div key='2' v-if='selectedSlide === 1'>
        {{ formData }}
        <section>
          <h3 class='title heading h--xm h--color-primary'>Categories</h3>
          <div class='categories'>
            <div class='category' v-for='category in categories' :key='category.id' @click='categorySelect(category)'>
              <div v-if='category.slug !== "suggest"' class='flex align-center'>
                {{ formData.categories }}
                {{ category }}
                <check-mark :checked='formData.categories.indexOf(category.id) > -1'/>
                <img :src='require(`@/assets/icons/categories/${ category.slug }.png`)' :alt='`${ capFirstChar(category.category) } icon.`'>
                <h2 class='heading h--m'>{{ category.category }}</h2>
              </div>
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
import clonedeep from 'lodash.clonedeep';
import GlobalMethods from '@/mixins/GlobalMethods';
import ModalMixins from '@/mixins/ModalMixins';
import DefaultButton from '@/components/buttons/DefaultButton';
import CheckMark from '@/components/buttons/CheckMark';
import SubmitAndCancel from '@/components/buttons/SubmitAndCancel';

export default {
  /* === ModalMixins.js ===
  - selectedSlide (data)
  - nextSlide (method)
  - prevSlide (method)
  ========== */

  name: 'SaveQuiz',
  mixins: [GlobalMethods, ModalMixins],
  components: { DefaultButton, CheckMark, SubmitAndCancel },
  data: () => ({
    formData: {}
  }),
  computed: {
    ...mapState('Categories', ['categories']),
    ...mapState('CreateQuiz', ['quiz'])
  },
  created () {
    this.$store.dispatch('Categories/fetchCategories');
    this.formData = clonedeep(this.quiz);
  },
  methods: {
    setImage (output) {
      this.formData.quizImg = output;
    },

    getQuizImgSource () {
      if (this.formData.quizImg === '') {
        return require(`@/assets/img/samples/categories/${ this.formData.quizSample }.jpg`);
      }

      if (this.formData.sampleImg === '') {
        return this.formData.quizImg;
      }
    },

    categorySelect (category) {
      if (this.formData.categories.indexOf(category) > -1) {
        let index = this.formData.categories.indexOf(category);
        this.formData.categories.splice(index, 1);
      } 
      else {
        this.formData.categories.push(category)
      }
    },

    onFormSubmit () {
      if (this.formData.quizImg === '') {
        const randomCategory = this.formData.categories[Math.floor(Math.random() * (this.formData.categories.length - 0) + 0)].slug;
        const quizSample = `${ randomCategory }/${ Math.floor(Math.random() * (3 - 1) + 1) }`;
        
        this.formData.quizSample = quizSample;
      }

      this.formData.isQRQuiz = false;
      this.formData.isPublic = true;

      console.log('FORM DATA', this.formData);

      this.$store.dispatch('CreateQuiz/onQuizFormSubmit', { quiz: this.formData });
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
      margin: 1.5rem 0;

      img {
        width: 2rem;
        height: 100%;
        margin-right: 1rem;
      }
    }
  }
}
</style>