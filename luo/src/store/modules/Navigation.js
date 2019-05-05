export const Navigation = {
  namespaced: true,

  state: {
    selectedOverview: 'new',
    categoriesIsOpen: false
  },

  mutations: {
    /* === SET SELECTED OVERVIEW IN BOTTOM NAV === */
    SET_SELECTED_OVERVIEW (state, selected) {
      state.selectedOverview = selected;
    },
    /* ========== */

    /* === TOGGLE CATEGORIES === */
    SET_CATEGORIES_ON (state) {
      state.categoriesIsOpen = true;
    },

    SET_CATEGORIES_OFF (state) {
      state.categoriesIsOpen = false;
    }
    /* ========== */
  },

  actions: {
    /* === ICON CLICKED IN BOTTOM NAV === */
    onIconClick ({ commit, dispatch, state }, payload) {
      if ((payload.selected !== state.selectedOverview || ( payload.selected === 'category' && !state.categoriesIsOpen)) || payload.isPageLoad) {
        commit('Header/SET_HEADER_TITLE', payload.selected, { root: true });
        commit('SET_CATEGORIES_OFF');

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
            commit('SET_CATEGORIES_ON');
            dispatch('Categories/fetchCategories', {}, { root: true });
          break;
        }
      }

      commit('SET_SELECTED_OVERVIEW', payload.selected);
    },
    /* ========== */

    /* === WHEN PAGE IS LOADED AFTER PAGE TRANSITION === */
    onPageLoad ({ dispatch, state }) {
      dispatch('onIconClick', { selected: state.selectedOverview, isPageLoad: true });
    }
    /* ========== */
  }
}