import { db } from '@/firebase/firebase';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: []
  },

  mutations: {
    SAVE_QUIZZES (state, quizzes) {
      state.quizzes = quizzes;
    },

    CLEAR_QUIZES (state) {
      state.quizzes = [];
    }
  },

  actions: {
    fetchNewQuizzes ({ commit }) {
      db.collection('quizzes').orderBy('timestamp', 'desc').onSnapshot(snap => {
        let quizzes = [];

        snap.forEach(doc => {
          quizzes.push(doc.data());
        });

        commit('SAVE_QUIZZES', quizzes)
      })
    },

    fetchQuizesByCategory () {

    }
  }
}