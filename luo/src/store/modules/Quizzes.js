import { firebase, db, storage } from '@/firebase/firebase';
import moment from 'moment';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: [],
    quizzesRecentByUser: [],
    quizzesPopularByUser: [],
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

    /* === SAVE RECENT QUIZZES BY USER === */
    SAVE_RECENT_QUIZZES_BY_USER (state, quizzes) {
      state.quizzesRecentByUser = quizzes;
    },
    /* ========== */

    /* === SAVE POPULAR QUIZZES BY USER === */
    SAVE_POPULAR_QUIZZES_BY_USER (state, quizzes) {
      state.quizzesPopularByUser = quizzes;
    },
    /* ========== */

    /* === CLEAR POPULAR AND RECENT QUIZZES OF USER === */
    CLEAR_QUIZZES_BY_USER (state) {
      state.quizzesRecentByUser = [];
      state.quizzesPopularByUser = [];
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
      db.collection('quizzes').where('createdBy', '==', payload.userId).get().then(snap => {
        commit('SAVE_RECENT_QUIZZES_BY_USER', snap.docs.map(doc => doc.data()));
      });
    },
    /* ========== */

    /* === POST NEW QUIZ === */
    async postNewQuiz ({ dispatch, rootState }, payload) {
      const questions = rootState.CreateQuiz.questions;

      // CHECK IF THERE IS AT LEAST ONE QUESTION MADE questions.length > 0
      if (questions.length > 0) {
        const quiz = {
          title: payload.title,
          description: payload.description,
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