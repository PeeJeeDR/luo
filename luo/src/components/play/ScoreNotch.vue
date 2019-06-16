<template>
  <div class='score-notch'>
    <h4 class='heading h--m h--color-light'>
      Score: {{ getScore }}/{{ reviews.length }}
    </h4>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'ScoreNotch',
  computed: {
    ...mapGetters('PlayQuiz', ['getScore']),
    ...mapState('PlayQuiz', ['reviews'])
  }
}
</script>

<style lang='scss' scoped>
.score-notch
{
  text-align: center;
  
  h4 {
    background-color: $pinky;
    padding: 0.8rem 1.2rem;
    border-bottom-left-radius: $mediumRadius;
    border-bottom-right-radius: $mediumRadius;
    display: inline-block;
  }
}
</style>