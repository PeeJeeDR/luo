export const Sidebar = {
  namespaced: true,

  state: {
    open: false,
    selectedCategory: undefined
  },

  mutations: {
    SET_SIDEBAR_ON (state) {
      state.open = true;
    },

    SET_SIDEBAR_OFF (state) {
      state.open = false;
    },

    SET_SELECTED_CATEGORY (state, categoryId) {
      state.selectedCategory = categoryId;
    },

    CLEAR_SELECTED_CATEGORY (state) {
      state.selectedCategory = undefined;
    }
  },

  actions: {
    // Open the sidebar.
    openSidebar ({ commit }) {
      commit('SET_SIDEBAR_ON');
    },

    // Close the sidebar.
    closeSidebar ({ commit }) {
      commit('SET_SIDEBAR_OFF');
    },

    // When a category is pressed in the sidebar.
    onCategoryClick ({ commit }, payload) {
      commit('SET_SELECTED_CATEGORY', payload.categoryId);
      commit('SET_SIDEBAR_OFF');
    },

    onBottomNavigationPress ({ commit }) {
      commit('CLEAR_SELECTED_CATEGORY');
    }
  }
}