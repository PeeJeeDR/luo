export default {
  data: () => ({
    selectedSlide: 0
  }),
  methods: {
    /* === CHANGE SLIDES === */
    prevSlide () {
      this.selectedSlide -= 1;
    },

    nextSlide () {
      this.selectedSlide += 1;
    },
    /* ========== */
  }
}