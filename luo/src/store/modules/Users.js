import { db } from '@/firebase/firebase';
import router from '@/router';

export const Users = {
  namespaced: true,

  state: {
    user: undefined,
    quizUser: undefined
  },

  mutations: {
    // Save profile.
    SAVE_USER (state, user) {
      state.user = user;
    },
    CLEAR_USER (state) {
      state.user = undefined;
    },

    SAVE_QUIZ_USER (state, user) {
      state.quizUser = user;
    },
    CLEAR_QUIZ_USER () {
      state.quizUser = undefined;
    }
  },

  actions: {
    // Fetch user by id.
    fetchUserById ({ commit }, payload) {
      db.collection('users').doc(payload.userId).onSnapshot(snap => {
        if (snap.data() !== undefined) {
          let result = snap.data();
          result.id = payload.userId;

          if (payload.type === 'user') {
            commit('SAVE_USER', result);
          }
          
          if (payload.type === 'quiz-user') {
            commit('SAVE_QUIZ_USER', result);
          }
        }

        if (snap.data() === undefined) {
          router.push('/authentication');
        }
      })
    },

    // Update thus users avatar.
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

    // Clear user when app loads.
    onAppLoad ({ commit }) {
      commit('CLEAR_USER');
    }
  }
}