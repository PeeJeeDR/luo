import { firebase, db } from '@/firebase/firebase';
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
    likesOfUser (state) {
      let likes = 0;

      state.quizzesMadeByUser.forEach(quiz => {
        likes += quiz.likes;
      });

      return likes;
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
      
      db.collection('quizzes')
      .where('public', '==', true)
      .where('isQRQuiz', '==', false)
      .orderBy('created', 'desc')
      .onSnapshot(snap => {
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

      db.collection('quizzes')
      .where('public', '==', true)
      .where('isQRQuiz', '==', false)
      .orderBy('plays', 'desc')
      .onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));

        commit('SET_LOADING_OFF');
      });
    },
    /* ========== */

    /* === FETCH QUIZZES BY CATEGORY === */
    fetchQuizesByCategory ({ commit }, payload) {
      commit('SET_LOADING_ON');

      db.collection('quizzes')
      .where('categories', 'array-contains', payload.categoryId)
      .where('public', '==', true)
      .onSnapshot(snap => {
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

        // Save quiz by id in this state.
        commit('SAVE_QUIZ_BY_ID', result);

        // Save quiz as playing quiz in PlayQuiz state.
        commit('PlayQuiz/SET_PLAYING_QUIZ', result, { root: true });

        // Fetch user that created the collected quiz.
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
    postNewQuiz ({ dispatch, rootState }, payload) {
      const questions = rootState.CreateQuiz.questions;
      const { title, description, categories, userId, quizImg, isPublic } = payload;

      // Check if there is at least one question made - questions.length > 0
      if (questions.length > 0) {
        const quiz = {
          title: title.charAt(0).toUpperCase() + title.substr(1),
          description: description.charAt(0).toUpperCase() + description.substr(1) + (description.charAt(description.length - 1) === '.' ? '' : '.'),
          public: isPublic,
          created: moment().format(),
          reports: [],
          plays: 0,
          playedBy: [],
          likes: 0,
          likedBy: [],
          createdBy: userId,
          quizImg: quizImg !== undefined ? quizImg : null,
          categories,
          questions,
          blocked: false,
          isQRQuiz: rootState.CreateQuiz.isQRQuiz
        }
  
        // Add quiz to firestore.
        db.collection('quizzes').add(quiz).then(() => {
          dispatch('Notifications/setNotification', { message: 'Quize made successfully!' }, { root: true });
        }).catch(() => {
          dispatch('Notifications/setNotification', { message: 'Something went wrong while creating the quiz. Please try again later.' }, { root: true });
        });
      }
    },
    /* ========== */

    /* === WHEN THE QUIZ IS COMPLETED WE NEED TO INCREMENT THE PLAYS ON THAT QUIZ === */
    addQuizPlay ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        playedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      });
    },
    /* ========== */

    /* === WHEN THE USER LIKES A QUIZ === */
    likeQuiz ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      });
    },
    /* ========== */

    /* === WHEN THE USER UNLIKES A QUIZ === */
    unlikeQuiz ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        likedBy: firebase.firestore.FieldValue.arrayRemove(payload.id)
      });
    }
    /* ========== */
  }
}