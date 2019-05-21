import { db } from '@/firebase/firebase';

export const Users = {
  namespaced: true,

  state: {
    userFromDB: undefined
  },

  mutations: {
    
    SAVE_USER (state, user) {
      state.userFromDB = user;
    },
    
    CLEAR_USER (state) {
      state.userFromDB = undefined;
    }
  },

  actions: {
    /* === FETCH SINGLE USER FROM FIRESTORE === */
    fetchUserById ({ commit }, payload) {
      db.collection('users').doc(payload.id).onSnapshot(snap => {
        commit('SAVE_USER', snap.data());
      });
    },
    /* ========== */

    /* === EXECUTE WHEN THE APP LOADS === */
    onAppLoad ({ commit }) {
      commit('CLEAR_USER');
    }
    /* ========== */
  }
}