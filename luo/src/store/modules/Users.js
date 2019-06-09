import { db, fire, firebase } from '@/firebase/firebase';
import router from '@/router';

export const Users = {
  namespaced: true,

  state: {
    user: undefined,
    quizUser: undefined,
    isOtherUser: false
  },

  mutations: {
    // Save profile.
    SAVE_USER (state, user) {
      state.user = user;
    },
    CLEAR_USER (state) {
      state.user = undefined;
    },

    // Save quiz profile.
    SAVE_QUIZ_USER (state, user) {
      state.quizUser = user;
    },
    CLEAR_QUIZ_USER (state) {
      state.quizUser = undefined;
    },

    // Tell the application that it has to show a other user.
    ENABLE_OTHER_USER (state) {
      state.isOtherUser = true;
    },
    DISABLE_OTHER_USER (state) {
      state.isOtherUser = false;
    }
  },

  actions: {
    // Fetch user by id.
    fetchUserById ({ commit, state }, payload) {
      db.collection('users').doc(payload.userId).onSnapshot(snap => {
        if (snap.data() !== undefined) {
          let result = snap.data();
          result.id = payload.userId;

          // Save user for personal or other user page.
          if (payload.type === 'user') {
            commit('SAVE_USER', result);
          }
          
          // Save user to show in QuizInfo.
          if (payload.type === 'quiz-user') {
            commit('SAVE_QUIZ_USER', result);
          }
        }

        if (snap.data() === undefined) {
          router.push('/authentication');
        }
      });
    },

    // Update thus users avatar.
    updateUserAvatar ({ state, dispatch }, payload) {
      db.collection('users').doc(state.userFromDB.id).update({ avatarUrl: payload.base64 })
      .then(() => {
        dispatch('Notifications/setNotification', { message: 'You profile image has updated successfully.' }, { root: true });
      })
      .catch(() => {
        dispatch('Notifications/setNotification', { message: 'Someting went wrong while updating your profile image.' }, { root: true });
      })
    },

    // Save the user in the store when the avatar is clicked in QuizInfo.
    onQuizInfoAvatarClick ({ commit, state }, payload) {
      commit('SAVE_USER', payload.user);

      if (fire.auth().currentUser) {
        if (fire.auth().currentUser.uid !== payload.user.id) {
          commit('ENABLE_OTHER_USER');
        }
  
        if (fire.auth().currentUser.uid !== payload.user.id) {
          router.push('/profile');
        }
      }

      if (!fire.auth().currentUser) {
        router.push('/profile');
      }
    },

    // When navigating away from /profile route.
    onProfileDismount ({ commit }) {
      commit('DISABLE_OTHER_USER');
      commit('CLEAR_QUIZ_USER');
    },

    // Clear user when app loads.
    onAppLoad ({ commit }) {
      commit('CLEAR_USER');
    },

    onUserFollow ({ state }) {
      db.collection('users').doc(state.user.id).update({
        followers: firebase.firestore.FieldValue.arrayUnion(fire.auth().currentUser.uid)
      });
    },

    onUserUnFollow ({ state }) {
      db.collection('users').doc(state.user.id).update({
        followers: firebase.firestore.FieldValue.arrayRemove(fire.auth().currentUser.uid)
      });
    }
  }
}