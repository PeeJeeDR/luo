export const Header = {
  namespaced: true,

  state: {
    headerTitle: 'new',
    leftIcon: '',
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
    onCategoryClick ({ commit }, payload) {
      commit('SET_HEADER_TITLE', payload.title);
    },

    onPageLoad ({ commit }, payload) {
      commit('SET_HEADER_TITLE', payload.title);
      commit('SET_LEFT_ICON', payload.leftIcon);
    }
  }
}