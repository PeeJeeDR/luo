import { db, storage } from '@/firebase/firebase';
import moment from 'moment';

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
      commit('Navigation/SET_CATEGORIES_OFF', {}, { root: true });

      db.collection('quizzes').where('categories', 'array-contains', payload.categoryId).onSnapshot(snap => {
        commit('SAVE_QUIZZES', snap.docs.map(doc => doc.data()));
        commit('SET_LOADING_OFF');
      }) 
    },
    /* ========== */

    /* === POST NEW QUIZ === */
    async postNewQuiz ({ dispatch, state, rootState }, payload) {
      console.log('post', payload);

      const questions = rootState.CreateQuiz.questions;
      let storageUrl = undefined;

      // SAVE IMAGE TO FIREBASE STORAGE
      if (payload.img !== undefined) {
        const name = payload.img.name;
        const meta = { contentType: payload.img.type }

        await storage.child(name).put(payload.img, meta).then(snap => snap.ref.getDownloadURL()).then(url => {
          console.log('URL FROM STORAGE', url);
          storageUrl = url;
        }).catch(err => {
          storageUrl = undefined;
        });
      }

      console.log('URL BEFORE ASSIGN', storageUrl);

      // CHECK IF THERE IS AT LEAST ONE QUESTION MADE questions.length > 0
      if (questions.length > 0) {
        const quiz = {
          title: payload.title,
          description: payload.description,
          public: payload.public,
          created: moment().format(),
          reports: [],
          categories: payload.categories,
          played: 0,
          likes: 0,
          imgUrl: storageUrl !== undefined ? storageUrl : null,
          questions,
        }
  
        // ADD QUIZ TO FIRESTORE
        db.collection('quizzes').add(quiz).then(res => {
          console.log('QUIZ POSTED');

          // REFETCH QUIZZES
          dispatch('fetchNewQuizzes');
        }).catch(() => {});
      }
    },
    /* ========== */
  }
}