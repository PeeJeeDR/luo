import { db } from '@/firebase/firebase';

export const Users = {
  namespaced: true,

  state: {
    userFromDB: undefined
  },

  mutations: {
    SAVE_USER (state, user) {
      state.userFromDB = user;
    }
  },

  actions: {
    fetchUserById ({ commit }, payload) {
      db.collection('users').doc(payload.id).onSnapshot(snap => {
        commit('SAVE_USER', snap.data());
      });
    }
  }
}