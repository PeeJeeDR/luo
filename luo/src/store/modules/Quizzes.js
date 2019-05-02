import { db } from '@/firebase/firebase';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: [],
    loading: false
  },

  mutations: {
    /* === QUIZES === */
    SAVE_QUIZZES (state, quizzes) {
      state.quizzes = quizzes;
    },

    CLEAR_QUIZES (state) {
      state.quizzes = [];
    },
    /* ========== */

    /* === LOADING === */
    SET_LOADING_ON (state) {
      state.loading = true;
    },

    SET_LOADING_OFF (state) {
      state.loading = false;
    }
    /* ========== */
  },

  actions: {
    fetchNewQuizzes ({ commit }) {
      commit('SET_LOADING_ON');
      
      db.collection('quizzes').orderBy('timestamp', 'desc').onSnapshot(snap => {
        let quizzes = [];

        snap.forEach(doc => {
          quizzes.push(doc.data());
        });

        commit('SAVE_QUIZZES', quizzes);
        commit('SET_LOADING_OFF');
      })
    },

    fetchQuizesByCategory () {

    }
  }
}