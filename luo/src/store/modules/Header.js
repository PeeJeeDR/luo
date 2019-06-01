export const Header = {
  namespaced: true,

  state: {
    headerTitle: 'new',
    leftIcon: 'hamburger',
    rightIcon: ''
  },

  mutations: {
    /* === SET TITLE IN MAIN HEADER === */
    SET_HEADER_TITLE (state, title) {
      state.headerTitle = title;
    },
    /* ========== */

    /* === SET ICONS === */
    SET_LEFT_ICON (state, icon) {
      state.leftIcon = icon;
    },

    SET_RIGHT_ICON (state, icon) {
      state.rightIcon = icon;
    }
    /* ========== */
  },

  actions: {
    onPageLoad ({ commit }, payload) {
      commit('SET_HEADER_TITLE', payload.title === 'qr' ? 'Scan QR code' : payload.title);
      commit('SET_LEFT_ICON', payload.leftIcon);
      commit('SET_RIGHT_ICON', payload.rightIcon);
    }
  }
}