import { fire } from '@/firebase/firebase';

export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizIsPlaying: false,
    quizCompleted: false,
    inputEnabled: true,
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
    },
    /* ========== */

    /* === ON ANSWER PRESS === */
    onAnswerClick ({ commit }, payload) {
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
      console.log('COMPLETE', state.playingQuiz);
      console.log('CURRENT USER ID', fire.auth().currentUser.uid);

      if (state.playingQuiz.createdBy !== fire.auth().currentUser.uid) {
        console.log('IS NOT CURRENT USER');
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz }, { root: true });
      }
      else {
        console.log('IS CURRENT USER');
      }

      
    },
    /* ========== */

    /* === WHEN THE QUIZ HAS BEEN ENDED === */
    onQuizEnd ({ commit }) {
      commit('SET_PLAYING_STATE_OFF');
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
    }
    /* ========== */
  }
}