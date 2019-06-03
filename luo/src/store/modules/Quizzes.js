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
    // Return the total likes of a user.
    likesOfUser (state) {
      let likes = 0;

      state.quizzesMadeByUser.forEach(quiz => {
        likes += quiz.likes;
      });

      return likes;
    }
  },

  mutations: {
    // Save all collected quizzes.
    SAVE_QUIZZES (state, quizzes) {
      state.quizzes = quizzes;
    },
    CLEAR_QUIZZES (state) {
      state.quizzes = [];
    },

    // Save single quiz by id.
    SAVE_QUIZ_BY_ID (state, quiz) {
      state.quizById = quiz;
    },
    CLEAR_QUIZ_BY_ID (state) {
      state.quizById = undefined;
    },

    // Save quizzes made by user.
    SAVE_QUIZZES_MADE_BY_USER (state, quizzes) {
      state.quizzesMadeByUser = quizzes;
    },
    CLEAR_QUIZZES_MADE_BY_USER (state) {
      state.quizzesMadeByUser = [];
    },

    // Save the quizzes played by user.
    SAVE_QUIZZES_PLAYED_BY_USER (state, quizzes) {
      state.quizzesPlayedByUser = quizzes;
    },
    CLEAR_QUIZZES_PLAYED_BY_USER (state) {
      state.quizzesPlayedByUser = [];
    },

    // Loading state.
    SET_LOADING_ON (state) {
      state.loading = true;
    },
    SET_LOADING_OFF (state) {
      state.loading = false;
    }
  },

  actions: {
    // Fetch new quizzes.
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

    // Fetch popular quizzes.
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

    // Fetch quizzes by  category.
    fetchQuizesByCategory ({ commit }, payload) {
      commit('SET_LOADING_ON');

      db.collection('quizzes')
      .where('categories', 'array-contains', payload.categoryId)
      .where('public', '==', true)
      .where('isQRQuiz', '==', false)
      .onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));

        commit('SET_LOADING_OFF');
      }) 
    },

    // Fetch quizzes by id.
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

    // Fetch quizzes made by user id.
    fetchQuizzesMadeByUserId ({ commit }, payload) {
      db.collection('quizzes').where('createdBy', '==', payload.userId).onSnapshot(snap => {
        commit('SAVE_QUIZZES_MADE_BY_USER', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
      });
    },

    // Fetch quizzes played by user id.
    fetchQuizzesPlayedByUserId ({ commit }, payload) {
      db.collection('quizzes').where('playedBy', 'array-contains', payload.userId).onSnapshot(snap => {
        commit('SAVE_QUIZZES_PLAYED_BY_USER', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
      });
    },

    // Post a new quiz.
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

    // Increment plays when a quiz has been played.
    addQuizPlay ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        playedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      });
    },

    // When a user presses the like button.
    likeQuiz ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      });
    },

    // When a user again presses the like button.
    unlikeQuiz ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        likedBy: firebase.firestore.FieldValue.arrayRemove(payload.id)
      });
    },

    // Reset some variables on auth load.
    onAuthLoad ({ commit }) {
      commit('CLEAR_QUIZZES');
      commit('CLEAR_QUIZ_BY_ID');
      commit('CLEAR_QUIZZES_MADE_BY_USER');
      commit('CLEAR_QUIZZES_PLAYED_BY_USER');
    }
  }
}