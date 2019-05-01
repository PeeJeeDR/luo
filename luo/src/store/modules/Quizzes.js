import { db } from '@/firebase/firebase';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: []
  },

  mutations: {
    PUSH_QUIZ (state, quiz) {
      state.quizzes.push(quiz);
    },

    CLEAR_QUIZES (state) {
      state.quizzes = [];
    }
  },

  actions: {
    fetchQuizzes ({ commit }) {
      db.collection('quizzes').onSnapshot(snap => {
        snap.docChanges().forEach(change => {
          if (change.type === 'modified') {
            commit('CLEAR_QUIZES');
          }
        })
        snap.forEach(doc => {
          commit('PUSH_QUIZ', doc.data());
        });
      })
    }
  }
}