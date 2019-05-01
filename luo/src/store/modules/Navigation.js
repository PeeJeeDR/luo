export const Navigation = {
  namespaced: true,

  state: {
    selectedOverview: 'new'
  },

  mutations: {
    SET_SELECTED_OVERVIEW (state, selected) {
      state.selectedOverview = selected;
    }
  },

  actions: {
    onIconClick ({ commit }, payload) {
      commit('SET_SELECTED_OVERVIEW', payload.selected);
    }
  }
}