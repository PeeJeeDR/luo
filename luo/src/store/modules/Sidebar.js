export const Sidebar = {
  namespaced: true,

  state: {
    open: false
  },

  mutations: {
    SET_SIDEBAR_ON (state) {
      state.open = true;
    },

    SET_SIDEBAR_OFF (state) {
      state.open = false;
    }
  },

  actions: {
    openSidebar ({ commit }) {
      commit('SET_SIDEBAR_ON');
    },

    closeSidebar ({ commit }) {
      commit('SET_SIDEBAR_OFF');
    }
  }
}