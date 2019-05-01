<template>
  <div class='flex'>
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

        <div>
          <label for='likes'>Likes</label>
          <input name='likes' v-model='quiz.likes' type='text'>
        </div>

        <div>
          <label for='played'>Played</label>
          <input name='played' v-model='quiz.played' type='text'>
        </div>

        <button type='submit'>SUBMIT</button>
      </form>
    </div>

    <div>
      <button @click='generateData'>Generate quiz</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
      likes: 0,
      played: 0,
      timestamp: moment().format()
    }
  }),
  methods: {
    generateData () {
      this.quiz.title = Math.random().toString(36).substring(7);
      this.quiz.description = Math.random().toString(36).substring(7);
      this.quiz.question = Math.random().toString(36).substring(7);
      this.quiz.answer1 = Math.random().toString(36).substring(7);
      this.quiz.answer2 = Math.random().toString(36).substring(7);
      this.quiz.answer3 = Math.random().toString(36).substring(7);
      this.quiz.answer4 = Math.random().toString(36).substring(7);
      this.quiz.likes = Math.floor(Math.random() * 5001);
      this.quiz.played = Math.floor(Math.random() * 5001);
      this.quiz.timestamp = moment().format();

      this.onFormSubmit();
    },
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
        ],
        timestamp: this.quiz.timestamp,
        likes: parseInt(this.quiz.likes),
        played: parseInt(this.quiz.played),
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
