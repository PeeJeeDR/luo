<template>
  <div class='qr-info'>
    <transition mode='out-in' enter-active-class='animated fadeInLeft faster' leave-active-class='animated fadeOutLeft faster'>
      <div key='0' v-if='!scanIsOpen'>
        <section>
          <h3 class='title heading h--xm h--color-primary'>QR code quizzes</h3>
          <p>
            If you want your quiz to be only available with a QR code so that only
            people with the code can play the quiz.
          </p>
        </section>

        <section>
          <default-button :content='"Scan QR code"' @click.native='onQuizScan'/>
          <default-button :content='"Make QR code quiz"' @click.native='onQuizMake'/>
        </section>
      </div>

      <div key='1' v-if='scanIsOpen' class='scanner'>
        <qrcode-stream 
          @decode='onDecode'
          :camera='"rear"'
        ></qrcode-stream>
      </div>
    </transition>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import DefaultButton from '@/components/buttons/DefaultButton';

export default {
  name: 'QRInfo',
  components: { DefaultButton, QrcodeStream, QrcodeDropZone, QrcodeCapture },
  data: () => ({
    scanIsOpen: false
  }),
  methods: {
    onQuizScan () {
      this.scanIsOpen = !this.scanIsOpen;
    },

    onQuizMake () {
      this.$store.dispatch('CreateQuiz/onQRQuizCreate');
      this.$router.push('/quizzes/create');
      this.$store.dispatch('Modals/closeModal');
    },

    async onDecode (decodedString) {
      // Close the scanner.
      await this.$store.dispatch('Modals/closeModal');
      
      // Fetch quiz by id.
      await this.$store.dispatch('Quizzes/fetchQuizById', { id: decodedString });

      // Show the collected quiz in the quiz info modal.
      this.$store.dispatch('Modals/openModal', { type: 'quiz-info' });
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
    height: 20rem;
  }

  video {
    object-fit: cover !important;
    width: 60rem;
    height: 22rem !important;
  }
}
</style>