import { db } from '@/firebase/firebase';

export const Users = {
  namespaced: true,

  state: {
    userFromDB: undefined
  },

  mutations: {
    /* === USER === */
    SAVE_USER (state, user) {
      state.userFromDB = user;
    },
    CLEAR_USER (state) {
      state.userFromDB = undefined;
    }
    /* ========== */
  },

  actions: {
    /* === FETCH SINGLE USER FROM FIRESTORE === */
    fetchUserById ({ commit }, payload) {
      db.collection('users').doc(payload.userId).get().then(snap => {
        let result = snap.data();
        result.id = payload.userId;
        commit('SAVE_USER', result);
      });
    },
    /* ========== */

    /* === UPDATE THE AVATAR IMAGE OF THE USER === */
    updateUserAvatar ({ state }, payload) {
      db.collection('users').doc(state.userFromDB.id).update({
        avatarUrl: payload.base64
      }).then(() => {}).catch(() => {})
    },
    /* ========== */

    /* === EXECUTE WHEN THE APP LOADS === */
    onAppLoad ({ commit }) {
      commit('CLEAR_USER');
    }
    /* ========== */
  }
}