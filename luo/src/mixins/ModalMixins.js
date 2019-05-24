export default {
  data: () => ({
    selectedSlide: 0,
    error: '',
    error1: ''
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

        case 'quiz-1-2': 
          if (this.formData.title.trim() !== '' && this.formData.description.trim() !== '') {
            this.error = '';
            this.error1 = '';
            this.selectedSlide += 1;
          }

          if (this.formData.title.trim() === '') {
            this.formData.title = '';
            this.error = 'You have to fill in a title.';
          }
          else {
            this.error = '';
          }

          if (this.formData.description.trim() === '') {
            this.formData.description = '';
            this.error1 = 'You have to fill in a description.';
          }
          else {
            this.error1 = '';
          }
        break;
      }
    }
    /* ========== */
  }
}