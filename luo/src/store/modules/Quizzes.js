import { firebase, fire, db } from '@/firebase/firebase';
import moment from 'moment';

export const Quizzes = {
  namespaced: true,

  state: {
    quizzes: [],
    quizzesMadeByUser: [],
    quizzesPlayedByUser: [],
    quizById: undefined,
    loading: false
  },

  getters: {
    getRecentQuizzes (state) {
      return [...state.quizzesMadeByUser].sort((a, b) => moment(b.created) - moment(a.created)).splice(0, 3);
    },

    getPopularQuizzes (state) {
      return [...state.quizzesMadeByUser].sort((a, b) => moment(b.played) - moment(a.played)).splice(0, 3);
    }
  },

  mutations: {
    /* === QUIZES === */
    SAVE_QUIZZES (state, quizzes) {
      state.quizzes = quizzes;
    },
    /* ========== */

    /* === SAVE QUIZ BY ID === */
    SAVE_QUIZ_BY_ID (state, quiz) {
      state.quizById = quiz;
    },
    /* ========== */

    /* === SAVE QUIZZES MADE BY USER === */
    SAVE_QUIZZES_MADE_BY_USER (state, quizzes) {
      state.quizzesMadeByUser = quizzes;
    },
    /* ========== */

    /* === SAVE QUIZZES PLAYED BY USER === */
    SAVE_QUIZZES_PLAYED_BY_USER (state, quizzes) {
      state.quizzesPlayedByUser = quizzes;
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
        commit('SAVE_QUIZZES', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
        commit('SET_LOADING_OFF');
      });
    },
    /* ========== */

    /* === FETCH POPULAR QUIZZES === */
    fetchPopularQuizzes ({ commit }) {
      commit('SET_LOADING_ON');

      db.collection('quizzes').orderBy('plays', 'desc').onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
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
        commit('SAVE_QUIZZES', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
        commit('SET_LOADING_OFF');
      }) 
    },
    /* ========== */

    /* === FETCH QUIZ BY ID === */
    fetchQuizById ({ commit, dispatch }, payload) {
      db.collection('quizzes').doc(payload.id).onSnapshot(doc => {
        let result = doc.data();
        result.id = doc.id;
        commit('SAVE_QUIZ_BY_ID', result);

        dispatch('Users/fetchUserById', { userId: result.createdBy }, { root: true });
      });
    },
    /* ========== */

    /* === FETCH QUIZZES MADE BY USER ID === */
    fetchQuizzesMadeByUserId ({ commit }, payload) {
      db.collection('quizzes').where('createdBy', '==', payload.userId).onSnapshot(snap => {
        commit('SAVE_QUIZZES_MADE_BY_USER', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
      });
    },
    /* ========== */

    /* === FETCH QUIZZES PLAYED BY USER ID === */
    fetchQuizzesPlayedByUserId ({ commit }, payload) {
      db.collection('quizzes').where('playedBy', 'array-contains', payload.userId).onSnapshot(snap => {
        commit('SAVE_QUIZZES_PLAYED_BY_USER', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
      });
    },
    /* ========== */

    /* === POST NEW QUIZ === */
    async postNewQuiz ({ dispatch, rootState }, payload) {
      const questions = rootState.CreateQuiz.questions;
      const { title, description, categories, userId, quizImg } = payload;

      // Check if there is at least one question made - questions.length > 0
      if (questions.length > 0) {
        const quiz = {
          title: title.charAt(0).toUpperCase() + title.substr(1),
          description: description.charAt(0).toUpperCase() + description.substr(1) + (description.charAt(description.length - 1) === '.' ? '' : '.'),
          public: true,
          created: moment().format(),
          reports: [],
          plays: 0,
          playedBy: [],
          likes: 0,
          likedBy: [],
          createdBy: userId,
          quizImg: quizImg !== undefined ? quizImg : null,
          categories,
          questions
        }
  
        // Add quiz to firestore.
        await db.collection('quizzes').add(quiz).then(() => {
          dispatch('Notifications/setNotification', { message: 'Quize made successfully!' }, { root: true });
        }).catch(() => {
          dispatch('Notifications/setNotification', { message: 'Something went wrong while creating a quiz. Please try again later.' }, { root: true });
        });

        // Refetch quizzes.
        dispatch('fetchNewQuizzes');
      }
    },
    /* ========== */

    /* === WHEN THE QUIZ IS COMPLETED WE NEED TO INCREMENT THE PLAYS ON THAT QUIZ === */
    async addQuizPlay ({ dispatch }, payload) {
      await db.collection('quizzes').doc(payload.quiz.id).update({
        playedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      });

      // Refetch quizzes.
      dispatch('fetchNewQuizzes');
    },
    /* ========== */

    /* === WHEN THE USER LIKES A QUIZ === */
    async likeQuiz ({ dispatch }, payload) {
      await db.collection('quizzes').doc(payload.quiz.id).update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      });

      // Refetch quizzes.
      dispatch('fetchNewQuizzes');
    }
    /* ========== */
  }
}