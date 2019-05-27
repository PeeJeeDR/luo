export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizIsPlaying: false,
    evaluation: 'none',
    xp: 0
  },

  mutations: {
    /* === SET QUIZ TO BE PLAYED === */
    SET_PLAYING_QUIZ (state, quiz) {
      state.playingQuiz = quiz;
    },
    /* ========== */

    /* === PLAYING STATE === */
    SET_PLAYING_STATE_ON (state) {
      state.quizIsPlaying = true;
    },
    SET_PLAYING_STATE_OFF (state) {
      state.quizIsPlaying = false;
    },
    /* ========== */

    /* === SET QUIZ TO BE PLAYED === */
    SET_EVALUATION_NONE (state) {
      state.evaluation = 'none';
    },
    SET_EVALUATION_CORRECT (state) {
      state.evaluation = 'correct';
    },
    SET_EVALUATION_WRONG (state) {
      state.evaluation = 'wrong';
    },
    /* ========== */
  },

  actions: {
    /* === WHEN PLAY BUTTON HAS CLICKED === */
    onPlayButtonClick ({ commit }, payload) {
      commit('SET_PLAYING_QUIZ', payload.quiz);
      commit('SET_PLAYING_STATE_ON');
    },
    /* ========== */

    /* === WHEN PLAYER STOPS PLAYING QUIZ === */
    stopQuiz ({ commit }) {
      commit('SET_PLAYING_STATE_OFF');
      commit('SET_EVALUATION_NONE');
    },
    /* ========== */

    /* === ON ANSWER PRESS === */
    onCorrectAnswer ({ commit }) {
      commit('SET_EVALUATION_CORRECT');
    },
    onWrongAnswer ({ commit }) {
      commit('SET_EVALUATION_WRONG');
    },
    /* ========== */

    /* === WHEN NEW QUESTION LOADS === */
    onNewQuestionLoad ({ commit }) {
      commit('SET_EVALUATION_NONE');
    }
    /* ========== */
  }
}