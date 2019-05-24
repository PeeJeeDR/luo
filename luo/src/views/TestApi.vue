<template>
  <div class='flex-center test-api wrapper'>
    <div class='flex direction-col'>
      <button v-ripple @click='scaffoldCategories'>Scaffold categories</button>
    </div>

    <p v-if='message !== ""' class='message'>{{ message }}</p>
    <p v-if='error !== ""' class='error'>{{ error }}</p>
  </div>  
</template>

<script>
import app from '@/settings/app.json';
import moment from 'moment';
import { db } from '@/firebase/firebase';

export default {
  name: 'TestApi',
  data: () => ({
    message: '',
    error: ''
  }),
  methods: {
    scaffoldCategories () {
      let batch = db.batch();

      app.categories.forEach(category => {
        console.log('TEST');
        batch.update(db.collection('categories').doc(), category);
      });

      batch.commit().then(() => {
        this.message = 'Scaffolding complete!';
      }).catch(err => {
        this.error = 'Scaffolding failed! ' + err;
      })
      
    }
  }
}
</script>

<style lang='scss' scoped>
.test-api {
  height: 100%;

  button {
    border-bottom: 3px solid #0049FF;
    padding: 1rem;
    border-radius: 5px;
  }

  .message, .error {
    position: fixed;
    bottom: 20px;
  }

  .message {
    color: green;
  }

  .error {
    color: red;
  }
}
</style>
