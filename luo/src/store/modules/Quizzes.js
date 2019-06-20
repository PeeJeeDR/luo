import { firebase, db, fire } from '@/firebase/firebase';
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
    },

    publicQuizzesByUser (state) {
      return state.quizzesMadeByUser.filter(quiz => !quiz.isQRQuiz);
    },

    QRQuizzesByUser (state) {
      return state.quizzesMadeByUser.filter(quiz => quiz.isQRQuiz);
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
      .where('isPublic', '==', true)
      .where('isQRQuiz', '==', false)
      .where('isDeleted', '==', false)
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
      .where('isPublic', '==', true)
      .where('isQRQuiz', '==', false)
      .where('isDeleted', '==', false)
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
    fetchQuizzesByCategory ({ commit }, payload) {
      commit('SET_LOADING_ON');

      db.collection('quizzes')
      .where('categories', 'array-contains', payload.categoryId)
      .where('isPublic', '==', true)
      .where('isQRQuiz', '==', false)
      .where('isDeleted', '==', false)
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
      try {
        db.collection('quizzes').doc(payload.id)
        .onSnapshot(doc => {
          if (doc.exists) {
            let result = doc.data();
            result.id = doc.id;
  
            // Save quiz by id in this state.
            commit('SAVE_QUIZ_BY_ID', result);
  
            // Save quiz as playing quiz in PlayQuiz state.
            commit('PlayQuiz/SET_PLAYING_QUIZ', result, { root: true });
  
            // Fetch user that created the collected quiz.
            dispatch('Users/fetchUserById', { userId: result.createdBy, type: 'quiz-user' }, { root: true });

            // Open quiz info modal.
            dispatch('Modals/openModal', { type: 'quiz-info' }, { root: true });
          }
  
          if (!doc.exists) {
            dispatch('Notifications/setNotification', { 
              message: 'Something went wrong by fetching this quiz. Please try again later.' 
            }, { root: true });
          }
        });
      } catch (err) {
        if (payload.type === 'QR-scan') {
          dispatch('Notifications/setNotification', { 
            message: 'Something went wrong by fetching this quiz. Please try again later.' 
          }, { root: true });
        }
        
        dispatch('Notifications/setNotification', { 
          message: 'Something went wrong by scanning this quiz. Please try again later.' 
        }, { root: true });
      }
    },

    // Fetch quizzes made by user id.
    fetchQuizzesMadeByUserId ({ commit }, payload) {
      db.collection('quizzes')
      .where('createdBy', '==', payload.userId)
      .where('isDeleted', '==', false)
      .orderBy('created', 'desc')
      .onSnapshot(snap => {
        commit('SAVE_QUIZZES_MADE_BY_USER', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
      });
    },

    // Fetch quizzes played by user id.
    fetchQuizzesPlayedByUserId ({ commit }, payload) {
      db.collection('quizzes')
      .where('playedBy', 'array-contains', payload.userId)
      .onSnapshot(snap => {
        commit('SAVE_QUIZZES_PLAYED_BY_USER', snap.docs.map(doc => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        }));
      });
    },

    // Post a new quiz.
    postNewQuiz ({ dispatch }, payload) {
      const { title, description, questions, categories, isQRQuiz, quizImg, isPublic, quizSample } = payload.quiz;

      // Tell the CreateQuiz.vue page to route to another page.
      dispatch('Modals/onConfirmAnswerSelect', { confirmAnswer: 'leave' }, { root: true });

      // Check if there is at least one question made - questions.length > 0
      if (questions.length > 0) {
        const quiz = {
          title: title.charAt(0).toUpperCase() + title.substr(1),
          description: description.charAt(0).toUpperCase() + description.substr(1) + (description.charAt(description.length - 1) === '.' ? '' : '.'),
          created: moment().format(),
          reports: [],
          plays: 0,
          playedBy: [],
          likes: 0,
          likedBy: [],
          createdBy: fire.auth().currentUser.uid,
          quizImg,
          quizSample,
          categories,
          questions,
          blocked: false,
          isQRQuiz,
          isPublic,
          isDeleted: false
        }
  
        // Add quiz to firestore.
        db.collection('quizzes').add(quiz)
        .then(() => {
          dispatch('Notifications/setNotification', { message: 'Quiz made successfully!' }, { root: true });
        })
        .catch(() => {
          dispatch('Notifications/setNotification', { message: 'Something went wrong while creating the quiz. Please try again later.' }, { root: true });
        });
      }
    },

    updateQuiz ({ dispatch }, payload) {
      // Close the modal.
      dispatch('Modals/closeModal', {}, { root: true });

      db.collection('quizzes').doc(payload.quiz.id).update(payload.quiz)
      .then(() => {
        // Tell the CreateQuiz.vue page to route to another page.
        dispatch('Modals/onConfirmAnswerSelect', { confirmAnswer: 'leave' }, { root: true });

        // Show notification to the user.
        dispatch('Notifications/setNotification', { message: 'Quiz updated successfully!' }, { root: true });
      })
      .catch(() => {
        // Show notification to the user.
        dispatch('Notifications/setNotification', { message: 'Something went wrong while updating the quiz. Please try again later.' }, { root: true });
      });
    },

    // Delete a specific quiz
    deleteQuiz ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        isDeleted: true
      });
    },

    // Increment plays when a quiz has been played.
    addQuizPlay ({}, payload) {
      db.collection('quizzes').doc(payload.quiz.id).update({
        playedBy: firebase.firestore.FieldValue.arrayUnion(payload.id)
      })
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