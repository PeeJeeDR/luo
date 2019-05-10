export const Modals = {
  namespaced: true,

  state: {
    questionModal: false,
    quizOptionsModal: false,
    overlay: false
  },

  mutations: {
    /* === MODALS === */
    OPEN_QUESTION_MODAL (state) {
      state.questionModal = true;
    },

    CLOSE_QUESTION_MODAL (state) {
      state.questionModal = false;
    },

    OPEN_QUIZ_OPTIONS_MODAL (state) {
      state.quizOptionsModal = true;
    },

    CLOSE_QUIZ_OPTIONS_MODAL (state) {
      state.quizOptionsModal = false;
    },
    /* ========== */

    /* === OVERLAY === */
    OPEN_OVERLAY (state) {
      state.overlay = true;
    },

    CLOSE_OVERLAY (state) {
      state.overlay = false;
    }
    /* ========== */
  },

  actions: {
    closeModals ({ commit }) {
      commit('CLOSE_QUESTION_MODAL');
      commit('CLOSE_QUIZ_OPTIONS_MODAL');
      commit('CLOSE_OVERLAY');
    },

    openQuestionModal ({ commit }) {
      commit('OPEN_QUESTION_MODAL');
      commit('OPEN_OVERLAY');
    },

    openQuizOptionsModal ({ commit }) {
      commit('OPEN_QUIZ_OPTIONS_MODAL');
      commit('OPEN_OVERLAY');
    }
  }
}