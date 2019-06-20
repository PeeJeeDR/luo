<template>
  <button 
    :class='`like-button flex-center ${ likeClass } ${ animateLikeButton && likeClass === "selected" && "animated bounceIn fast" }`' 
    @click='onLikeClick'
  >
    <likes />
  </button>
</template>

<script>
import { fire } from '@/firebase/firebase';
import Likes from '@/assets/icons/quizzes/Likes.svg';

export default {
  name: 'LikeButton',
  components: { Likes },
  props: ['quiz'],
  data: () => ({
    likeClass: '',
    animateLikeButton: false
  }),
  created () {
    this.checkLikeStatus();
  },
  methods: {
    checkLikeStatus () {
      if (fire.auth().currentUser) {
        if (this.quiz.likedBy.includes(fire.auth().currentUser.uid)) {
          this.likeClass = 'selected';
        }

        if (!this.quiz.likedBy.includes(fire.auth().currentUser.uid)) {
          this.likeClass = 'unselected';
        }
      }
    },

    onLikeClick () {
      if (this.likeClass === 'unselected') {
        this.$emit('onLike');
      }

      if (this.likeClass === 'selected') {
        this.$emit('onUnlike');
      }

      this.animateLikeButton = true;
      this.likeClass = this.likeClass === 'unselected' ? 'selected' : 'unselected';
    }
  },
  watch: {
    quiz () {
      this.checkLikeStatus();
    }
  }
}
</script>

<style lang='scss' scoped>
.like-button
{
  margin-top: 11rem;
  margin-bottom: 2rem;
  padding: 0.8rem;
  border: 2px solid;
  border-radius: 20rem;

  svg {
    width: 1.8rem; 
    height: 1.8rem;
  }

  &:hover {
    cursor: pointer;
  }
  
  &.unselected {
    border-color: $pinky;

    svg {
      fill: $pinky;
    }
  }

  &.selected {
    background-color: $pinky;
    border-color: $pinky;

    svg {
      fill: $snow;
    }
  }
}
</style>