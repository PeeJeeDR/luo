import { fire } from '@/firebase/firebase';

export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizIsPlaying: false,
    quizCompleted: false,
    inputEnabled: true,
    xp: 0,
    correctAnswers: 0,
    userAnswers: [] // ANTWOORDEN IN PUSHEN MET CORRECT OR FALSE.
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

    /* === ADD CORRECT OR WRONG ANSWER === */
    ADD_CORRECT_ANSWER (state) {
      state.correctAnswers += 1;
    },
    RESET_CORRECT_ANSWERS (state) {
      console.log('RESET CORRECT ANSWERS');
      state.correctAnswers = 0;
    }
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
      commit('RESET_CORRECT_ANSWERS');
    },
    /* ========== */

    /* === ON ANSWER PRESS === */
    onAnswerClick ({ commit }, payload) {
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

      if (state.playingQuiz.createdBy !== fire.auth().currentUser.uid) {
        console.log('IS NOT CURRENT USER');
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz }, { root: true });
      }
    },
    /* ========== */

    /* === WHEN THE QUIZ HAS BEEN ENDED === */
    onQuizEnd ({ commit }) {
      commit('SET_PLAYING_STATE_OFF');
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
    }
    /* ========== */
  }
}