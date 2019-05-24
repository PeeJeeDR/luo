export default {
  data: () => ({
    selectedSlide: 0,
    error: ''
  }),
  methods: {
    /* === CHANGE SLIDES === */
    prevSlide () {
      this.selectedSlide -= 1;
    },

    nextSlide (type) {
      switch (type) {
        case 'question-1-2':
          if (this.formData.question.trim() === '') {
            this.formData.question = '';
            this.error = 'You have to fill in a question.';
            return;
          }

          this.error = '';
          this.selectedSlide += 1;
        break;
      }
    }
    /* ========== */
  }
}