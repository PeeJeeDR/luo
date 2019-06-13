<template>
  <div class='qr-info'>
    <div class='scanner'>
      <h2 class='heading h--l h--color-light'>Scan a QR code!</h2>

      <qrcode-stream 
        @decode='onDecode'
        :camera='"auto"'
      ></qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'QRInfo',
  components: { DefaultButton, QrcodeStream },
  methods: {
    async onDecode (decodedString) {
      console.log('DECODED', decodedString);

      // Close scanner.
      this.$store.dispatch('Navigation/onQRScan');
      
      // Fetch quiz by id.
      this.$store.dispatch('Quizzes/fetchQuizById', { id: decodedString, type: 'QR-scan' })
      .then(() => {
        // Open quiz info modal.
        this.$store.dispatch('Modals/openModal', { type: 'quiz-info' });
      });
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

    h2 {
      position: absolute;
      z-index: 1;
      top: 0; left: 0; right: 0;
      text-align: center;
      margin: 1rem auto;
      opacity: 0.8;
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