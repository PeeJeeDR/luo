<template>
  <div class='qr-info'>
    <div class='scanner'>
      <h2 class='heading h--l h--color-light'>Scan a QR code!</h2>

      <button class='flex-center' @click='closeScanner'>
        <close />
      </button>
      

      <qrcode-stream 
        @decode='onDecode'
        :camera='"auto"'
      ></qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import Close from '@/assets/icons/main-header/Close.svg';
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'QRInfo',
  components: { DefaultButton, QrcodeStream, Close },
  methods: {
    async onDecode (decodedString) {
      this.closeScanner();
      
      // Fetch quiz by id.
      this.$store.dispatch('Quizzes/fetchQuizById', { id: decodedString, type: 'QR-scan' });
    },

    closeScanner () {
      this.$store.dispatch('Navigation/onQRScan');
    }
  }
}
</script>

<style lang='scss'>
.qr-info
{
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 5;
  background-color: $snow;

  .default-button:last-child {
    margin-top: 1rem;
  }

  .scanner {
    height: 100%;
    width: 100%;

    h2,
    button {
      position: absolute;
      z-index: 1;
    }

    h2 {
      bottom: 1rem; left: 0; right: 0;
      text-align: center;
      margin: 1rem auto;
      opacity: 0.8;
    }

    button {
      padding: 1rem;
      top: 1rem; right: 1rem;
      border: none;
      background-color: $snow;
      border-radius: 20rem;
      transition: all $fast ease-in-out;

      &:hover {
        cursor: pointer;
        background-color: $pinky;

        svg { fill: $snow }
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: $pinky;
        transition: all $fast ease-in-out;
      }
    }
    

    .wrapper {
      display: -webkit-box;
      height: 100%;
      width: 100%;
      margin: 0;

      .inside {
        height: 100%;
        width: 100%;

        video,
        canvas,
        .overlay {
          height: inherit;
        }
      }
    }
  }

  video {
    object-fit: cover !important;
    width: 100%;
  }
}
</style>