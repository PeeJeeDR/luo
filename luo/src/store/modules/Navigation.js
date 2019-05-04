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
    onIconClick ({ commit, dispatch, state }, payload) {
      console.log(payload.selected);

      if (payload.selected !== state.selectedOverview) {
        switch (payload.selected) {
          case 'new': 
            dispatch('Quizzes/fetchNewQuizzes', {}, { root: true });
          break;

          case 'popular': 
            dispatch('Quizzes/fetchPopularQuizzes', {}, { root: true });
          break;

          case 'interests':
            dispatch('Quizzes/fetchQuizzesByInterests', {}, { root: true });
          break;

          case 'category':
            dispatch('Quizzes/fetchQuizesByCategory', {}, { root: true });
          break;
        }
      }

      commit('SET_SELECTED_OVERVIEW', payload.selected);
    }
  }
}