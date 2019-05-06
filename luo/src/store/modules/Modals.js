export const Modals = {
  namespaced: true,

  state: {
    modal: false,
    overlay: false
  },

  mutations: {
    OPEN_MODAL (state) {
      state.modal = true;
    },

    CLOSE_MODAL (state) {
      state.modal = false;
    },

    OPEN_OVERLAY (state) {
      state.overlay = true;
    },

    CLOSE_OVERLAY (state) {
      state.overlay = false;
    },
  },

  actions: {
    onOverlayClick ({ commit }) {
      commit('CLOSE_MODAL');
      commit('CLOSE_OVERLAY');
    },

    onCreateClick ({ commit }) {
      commit('OPEN_MODAL');
      commit('OPEN_OVERLAY');
    }
  }
}