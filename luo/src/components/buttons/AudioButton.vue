<template>
  <button :class='`audio-button flex-center ${ playing ? "playing" : "paused" }`' @click='toggleAudio'>
    <volume />
  </button>
</template>

<script>
import Volume from '@/assets/icons/quizzes/Volume.svg';

export default {
  name: 'AudioButton',
  components: { Volume },
  props: ['file', 'autoPlay'],
  data: () => ({ 
    audioFile: undefined, 
    playing: false 
  }),
  created () {
    this.audioFile = new Audio(this.file);
    this.autoPlay && setTimeout(() => { this.toggleAudio() }, 600);
  },
  methods: {
    toggleAudio () {
      this.playing = !this.playing;

      this.playing ? this.audioFile.play() : (
        this.audioFile.pause(),
        this.audioFile.currentTime = 0
      );
    }
  }
}
</script>

<style lang='scss' scoped>
.audio-button
{
  width: 3rem;
  height: 3rem;
  border-radius: 20rem;
  flex: 0 0 3rem;
  
  &.paused {
    border: 2px solid $pinky;
    svg { fill: $pinky }
  }

  &.playing {
    border: 2px solid $pinky;
    background-color: $pinky;
    svg { fill: $snow }
  }

  &:hover {
    cursor: pointer;
    svg { transform: scale(0.9) }
  }

  svg {
    width: 50%;
    height: 50%;
    transition: all 100ms ease-in-out;
  }
}
</style>