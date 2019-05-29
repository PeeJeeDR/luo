export const Notifications = {
  namespaced: true,

  state: {
    notification: ''
  },

  mutations: {
    SET_NOTIFICATION (state, message) {
      state.notification = message;
    },

    CLEAR_NOTIFICATION (state) {
      state.notification = '';
    }
  },

  actions: {
    setNotification ({ commit }, payload) {
      console.log('SET NOTIFICATION', payload.message);
      commit('SET_NOTIFICATION', payload.message);

      setTimeout(() => {
        commit('CLEAR_NOTIFICATION');
      }, 3000)
    }
  }
}