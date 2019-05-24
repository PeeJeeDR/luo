import { firebase, db } from '@/firebase/firebase';
import moment from 'moment';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: [],
    quizzesByUser: [],
    loading: false
  },

  getters: {
    getRecentQuizzes (state) {
      return [...state.quizzesByUser].sort((a, b) => moment(b.created) - moment(a.created)).splice(0, 3);
    },

    getPopularQuizzes (state) {
      return [...state.quizzesByUser].sort((a, b) => moment(b.played) - moment(a.played)).splice(0, 3);
    }
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

    /* === SAVE QUIZZES BY USER === */
    SAVE_QUIZZES_BY_USER (state, quizzes) {
      state.quizzesByUser = quizzes;
    },

    CLEAR_QUIZZES_BY_USER (state) {
      state.quizzesByUser = [];
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
    /* === FETCH NEW QUIZZES === */
    fetchNewQuizzes ({ commit }) {
      commit('SET_LOADING_ON');
      
      db.collection('quizzes').orderBy('created', 'desc').onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => doc.data()));
        commit('SET_LOADING_OFF');
      });
    },
    /* ========== */

    /* === FETCH POPULAR QUIZZES === */
    fetchPopularQuizzes ({ commit }) {
      commit('SET_LOADING_ON');

      db.collection('quizzes').orderBy('played', 'desc').onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => doc.data()));
        commit('SET_LOADING_OFF');
      });
    },
    /* ========== */

    /* === FETCH QUIZZES BY INTERESTS === */
    fetchQuizzesByInterests ({ commit }) {
      
    },
    /* ========== */

    /* === FETCH QUIZZES BY CATEGORY === */
    fetchQuizesByCategory ({ commit }, payload) {
      commit('SET_LOADING_ON');

      db.collection('quizzes').where('categories', 'array-contains', payload.categoryId).onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => doc.data()));
        commit('SET_LOADING_OFF');
      }) 
    },
    /* ========== */

    /* === FETCH QUIZZES BY CATEGORY === */
    fetchQuizzesByUserId ({ commit }, payload) {
      db.collection('quizzes').where('createdBy', '==', payload.userId).onSnapshot(snap => {
        commit('SAVE_QUIZZES_BY_USER', snap.docs.map(doc => doc.data()));
      });
    },
    /* ========== */

    /* === POST NEW QUIZ === */
    async postNewQuiz ({ dispatch, rootState }, payload) {
      const questions = rootState.CreateQuiz.questions;

      // CHECK IF THERE IS AT LEAST ONE QUESTION MADE questions.length > 0
      if (questions.length > 0) {
        const quiz = {
          title: payload.title.charAt(0).toUpperCase() + payload.title.substr(1),
          description: payload.description.charAt(0).toUpperCase() + payload.description.substr(1) + '.',
          public: true,
          created: moment().format(),
          reports: [],
          categories: payload.categories,
          played: 0,
          playedBy: [],
          createdBy: payload.userId,
          likes: 0,
          quizImg: payload.quizImg !== undefined ? payload.quizImg : null,
          questions
        }
  
        // ADD QUIZ TO FIRESTORE
        db.collection('quizzes').add(quiz).then(res => {

          // ADD QUIZ ID TO USER QUIZZES MADE ARRAY
          db.collection('users').doc(payload.userId).update({
            quizzesMade: firebase.firestore.FieldValue.arrayUnion(res.id)
          }).then(() => {
            console.log('QUIZ ID ADDED TO USER QUIZZESMADE ARRAY');
          }).catch(err => {
            console.log('ERROR WHILE POSTING QUIZ ID IN QUIZZESMADE ARRAY', err);
          });

          // REFETCH QUIZZES
          dispatch('fetchNewQuizzes');
        }).catch(() => {});
      }
    },
    /* ========== */
  }
}