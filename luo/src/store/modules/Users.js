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
    fetchUserById ({ state, commit }, payload) {
      if (state.userFromDB === undefined) {
        db.collection('users').doc(payload.id).onSnapshot(snap => {
          let result = snap.data();
          result.id = payload.id;
          commit('SAVE_USER', result);
        });
      }
    },
    /* ========== */

    /* === UPDATE THE AVATAR IMAGE OF THE USER === */
    updateUserAvatar ({ commit, state }, payload) {
      db.collection('users').doc(state.userFromDB.id).update({
        avatarUrl: payload.base64
      }).then(res => {
        console.log('res', res);
      }).catch(err => {
        console.log('err', err);
      })
    },
    /* ========== */

    /* === EXECUTE WHEN THE APP LOADS === */
    onAppLoad ({ commit }) {
      commit('CLEAR_USER');
    }
    /* ========== */
  }
}