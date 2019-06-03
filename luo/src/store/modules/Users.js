import { db } from '@/firebase/firebase';
import router from '@/router';

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
        if (snap.data() !== undefined) {
          let result = snap.data();
          result.id = payload.userId;
          commit('SAVE_USER', result);
        }

        if (snap.data() === undefined) {
          router.push('/authentication');
        }
      });
    },
    /* ========== */

    /* === UPDATE THE AVATAR IMAGE OF THE USER === */
    updateUserAvatar ({ state, dispatch }, payload) {
      db.collection('users').doc(state.userFromDB.id).update({
        avatarUrl: payload.base64
      })
      .then(() => {
        dispatch('Notifications/setNotification', { message: 'You profile image has updated successfully.' }, { root: true });
        dispatch('fetchUserById', { userId: state.userFromDB.id });
      })
      .catch(err => {
        dispatch('Notifications/setNotification', { message: 'Someting went wrong while updating your profile image.' }, { root: true });
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