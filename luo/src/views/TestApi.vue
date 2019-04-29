<template>
  <div class='test-api'>
    <h3>POST QUIZ</h3>
    <form @submit.prevent='onFormSubmit'>
      <div>
        <label for='title'>title</label>
        <input name='title' v-model='quiz.title' type='text'>
      </div>

      <div>
        <label for='description'>description</label>
        <input name='description' v-model='quiz.description' type='text'>
      </div>

      <div>
        <label for='question'>question</label>
        <input name='question' v-model='quiz.question' type='text'>
      </div>

      <div>
        <label for='answer1'>answer 1</label>
        <input name='answer1' v-model='quiz.answer1' type='text'>
      </div>

      <div>
        <label for='answer2'>answer 2</label>
        <input name='answer2' v-model='quiz.answer2' type='text'>
      </div>

      <div>
        <label for='answer3'>answer 3</label>
        <input name='answer3' v-model='quiz.answer3' type='text'>
      </div>

      <div>
        <label for='answer4'>answer 4</label>
        <input name='answer4' v-model='quiz.answer4' type='text'>
      </div>

      <button type='submit'>SUBMIT</button>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase/firebase';

export default {
  name: 'TestApi',
  data: () => ({
    quiz: {
      title: '',
      description: '',
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    }
  }),
  methods: {
    onFormSubmit () {
      const data = {
        title: this.quiz.title,
        description: this.quiz.description,
        questions: [
          {
            question: this.quiz.question,
            answers: [
              {
                answer: this.quiz.answer1,
                correct: true
              },
              {
                answer: this.quiz.answer2,
                correct: false
              },
              {
                answer: this.quiz.answer3,
                correct: false
              },
              {
                answer: this.quiz.answer4,
                correct: false
              }
            ]
          }
        ]
      }

      console.log(data);

      db.collection('quizzes').add(data).then(res => {}).catch(err => {});
    }
  }
}
</script>

<style lang='scss' scoped>
.test-api {
  input {
    border: 1px solid black
  }

  label {
    display: block;
  }
}
</style>
