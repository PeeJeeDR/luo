export const Modals = {
  namespaced: true,

  state: {
    modalType: '',
    modalIsOpen: false,
    overlay: false
  },

  mutations: {
    /* === MODALS === */
    OPEN_MODAL (state) {
      state.modalIsOpen = true;
    },

    CLOSE_MODAL (state) {
      state.modalIsOpen = false;
    },

    SET_MODAL_TYPE (state, type) {
      state.modalType = type;
    },
    /* ========== */

    /* === OVERLAY === */
    OPEN_OVERLAY (state) {
      state.overlay = true;
    },

    CLOSE_OVERLAY (state) {
      state.overlay = false;
    }
    /* ========== */
  },

  actions: {
    openModal ({ commit }, payload) {
      commit('OPEN_MODAL');
      commit('OPEN_OVERLAY');
      commit('SET_MODAL_TYPE', payload.type)
    },

    closeModal ({ commit }) {
      commit('CLOSE_MODAL');
      commit('CLOSE_OVERLAY');
      commit('SET_MODAL_TYPE', '')
    }
  }
}