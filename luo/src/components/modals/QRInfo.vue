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
      // Close the scanner.
      await this.$store.dispatch('Modals/closeModal');
      
      // Fetch quiz by id.
      this.$store.dispatch('Quizzes/fetchQuizById', { id: decodedString, type: 'QR-scan' });
    }
  }
}
</script>

<style lang='scss'>
.qr-info
{
  .default-button:last-child {
    margin-top: 1rem;
  }

  .scanner {
    margin-left: -2rem;
    margin-bottom: -2rem;
    position: relative;

    h2 {
      position: absolute;
      z-index: 1;
      top: 0; left: 0; right: 0;
      text-align: center;
      padding-left: 2rem;
      margin: 1rem auto;
      opacity: 0.8;
    }

    .wrapper {
      display: -webkit-box;
    }
  }

  video {
    object-fit: cover !important;
    width: 100%;
  }
}
</style>