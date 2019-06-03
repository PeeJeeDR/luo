export const Header = {
  namespaced: true,

  state: {
    headerTitle: 'new',
    leftIcon: 'hamburger',
    rightIcon: ''
  },

  mutations: {
    // Set header title/
    SET_HEADER_TITLE (state, title) {
      state.headerTitle = title;
    },

    // Set header icons.
    SET_LEFT_ICON (state, icon) {
      state.leftIcon = icon;
    },
    SET_RIGHT_ICON (state, icon) {
      state.rightIcon = icon;
    }
  },

  actions: {
    // When a page loads the header is setted.
    onPageLoad ({ commit }, payload) {
      commit('SET_HEADER_TITLE', payload.title === 'qr' ? 'Scan QR code' : payload.title);
      commit('SET_LEFT_ICON', payload.leftIcon);
      commit('SET_RIGHT_ICON', payload.rightIcon);
    }
  }
}