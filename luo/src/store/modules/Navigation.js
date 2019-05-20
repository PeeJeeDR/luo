import router from '../../router';

export const Navigation = {
  namespaced: true,

  state: {
    selectedOverview: 'new',
  },

  mutations: {
    /* === SET SELECTED OVERVIEW IN BOTTOM NAV === */
    SET_SELECTED_OVERVIEW (state, selected) {
      state.selectedOverview = selected;
    },
    /* ========== */
  },

  actions: {
    /* === ICON CLICKED IN BOTTOM NAV === */
    onIconClick ({ commit, dispatch, state }, payload) {
      if (payload.selected !== state.selectedOverview || payload.selected === 'PAGE_LOAD') {
        switch (payload.selected) {
          case 'PAGE_LOAD':
          case 'new':
            router.push('/');
            dispatch('Quizzes/fetchNewQuizzes', {}, { root: true });
          break;

          case 'popular': 
            router.push('/');
            dispatch('Quizzes/fetchPopularQuizzes', {}, { root: true });
          break;

          case 'interests':
            router.push('/');
            dispatch('Quizzes/fetchQuizzesByInterests', {}, { root: true });
          break;

          case 'profile':
            router.push('/profile');
            dispatch('Categories/fetchCategories', {}, { root: true });
          break;
        }
      }

      commit('SET_SELECTED_OVERVIEW', payload.selected === 'PAGE_LOAD' ? 'new' : payload.selected);
    },
    /* ========== */

    /* === WHEN APP LOADS === */
    onAppLoad ({ dispatch }) {
      dispatch('onIconClick', { selected: 'PAGE_LOAD' });
    }
    /* ========== */
  }
}