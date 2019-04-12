export const Header = {
  namespaced: true,

  state: {
    open: true
  },

  mutations: {
    SET_HEADER_ON (state) {
      state.open = true;
    },

    SET_HEADER_OFF (state) {
      state.open = false;
    }
  },

  actions: {
    showHeader ({ commit }) {
      commit('SET_HEADER_ON');
    },

    hideHeader ({ commit }) {
      commit('SET_HEADER_OFF');
    }
  }
}