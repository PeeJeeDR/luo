import { fire } from '@/firebase/firebase';

export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizCompleted: false,
    inputEnabled: true,
    xp: 0,
    correctAnswers: 0,
  },

  mutations: {
    /* === SET QUIZ TO BE PLAYED === */
    SET_PLAYING_QUIZ (state, quiz) {
      state.playingQuiz = quiz;
    },
    /* ========== */

    /* === PLAYING STATE === */
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

    /* === ADD CORRECT OR WRONG ANSWER === */
    ADD_CORRECT_ANSWER (state) {
      state.correctAnswers += 1;
    },
    RESET_CORRECT_ANSWERS (state) {
      state.correctAnswers = 0;
    },
    /* ========== */

    /* === SET CLICKED ANSWER === */
    SET_CLICKED_ANSWER (state, payload) {
      state.playingQuiz.questions[payload.currentQuestion].answers[payload.clickedAnswerId].clicked = true;
    }
    /* ========== */
  },

  actions: {
    /* === WHEN PLAY BUTTON HAS CLICKED === */
    onPlayButtonClick ({ commit }, payload) {
      commit('SET_PLAYING_QUIZ', payload.quiz);
    },
    /* ========== */

    /* === WHEN PLAYER STOPS PLAYING QUIZ === */
    stopQuiz ({ commit }) {
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
    },
    /* ========== */

    /* === ON ANSWER PRESS === */
    onAnswerClick ({ commit }, payload) {
      if (payload.type === 'alter') {
        commit('SET_CLICKED_ANSWER', payload);
      }

      if (payload.type === 'correct') {
        commit('ADD_CORRECT_ANSWER');
      }

      commit('DISABLE_INPUT');
    },
    /* ========== */

    /* === WHEN NEW QUESTION LOADS === */
    onNewQuestionLoad ({ commit }) {
      commit('ENABLE_INPUT');
    },
    /* ========== */

    /* === WHEN THE QUIZ HAS BEEN COMPLETED === */
    quizCompleted ({ commit, dispatch, state }) {
      commit('SET_QUIZ_COMPLETED_ON');

      if (fire.auth().currentUser === null && localStorage.sessionId !== null) {
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz, id: localStorage.sessionId }, { root: true });
      }

      if (fire.auth().currentUser !== null && state.playingQuiz.createdBy !== fire.auth().currentUser.uid) {
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz, id: fire.auth().currentUser.uid }, { root: true });
      }
    },
    /* ========== */

    /* === WHEN THE QUIZ HAS BEEN ENDED === */
    onQuizEnd ({ commit }) {
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
    }
    /* ========== */
  }
}