import { db } from '@/firebase/firebase';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: []
  },

  mutations: {
    PUSH_QUIZ (state, quiz) {
      state.quizzes.push(quiz);
    }
  },

  actions: {
    fetchQuizzes ({ commit }) {
      db.collection('quizzes').onSnapshot(snap => {
        snap.forEach(doc => {
          commit('PUSH_QUIZ', doc.data());
        });
      })
    }
  }
}