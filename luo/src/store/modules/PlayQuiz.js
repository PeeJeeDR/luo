export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizIsPlaying: false,
    quizCompleted: false,
    inputEnabled: true,
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
    SET_QUIZ_COMPLETED_ON (state) {
      state.quizCompleted = true;
    },
    SET_QUIZ_COMPLETED_OFF (state) {
      state.quizCompleted = false;
    },
    /* ========== */

    /* === INPUT STATE === */
    ENABLE_INPUT (state) {
      state.inputEnabled = true;
    },
    DISABLE_INPUT (state) {
      state.inputEnabled = false;
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
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('SET_EVALUATION_NONE');
    },
    /* ========== */

    /* === ON ANSWER PRESS === */
    onAnswerClick ({ commit }, payload) {
      if (payload.type === 'correct') {
        commit('SET_EVALUATION_CORRECT');
      }
      
      if (payload.type === 'wrong') {
        commit('SET_EVALUATION_WRONG');
      }

      commit('DISABLE_INPUT');
    },
    /* ========== */

    /* === WHEN NEW QUESTION LOADS === */
    onNewQuestionLoad ({ commit }) {
      commit('SET_EVALUATION_NONE');
    },
    /* ========== */

    /* === WHEN THE QUIZ HAS BEEN COMPLETED === */
    quizCompleted ({ commit }) {
      commit('SET_QUIZ_COMPLETED_ON');
    },
    /* ========== */

    /* === WHEN THE QUIZ HAS BEEN ENDED === */
    onQuizEnd ({ commit }) {
      commit('SET_PLAYING_STATE_OFF');
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('SET_EVALUATION_NONE');
    }
    /* ========== */
  }
}