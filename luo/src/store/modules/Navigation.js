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
            // Open quiz overview.
            router.push('/');

            // Fetch new quizzes.
            dispatch('Quizzes/fetchNewQuizzes', {}, { root: true });
          break;

          case 'popular': 
            // Open quiz overview.
            router.push('/');

            // Fetch popular quizzes.
            dispatch('Quizzes/fetchPopularQuizzes', {}, { root: true });
          break;

          case 'interests':
            // Open quiz overview.
            router.push('/');

            // Fetch based on interests.
            dispatch('Quizzes/fetchQuizzesByInterests', {}, { root: true });
          break;

          case 'profile':
            // Open profile page.
            router.push('/profile');
          break;
        }
      }

      let selected = payload.selected === 'PAGE_LOAD' ? 'new' : payload.selected;

      // Set the selected overview.
      commit('SET_SELECTED_OVERVIEW', selected);

      // Set header props on icon click.
      commit('Header/SET_HEADER_TITLE', selected, { root: true });
    },
    /* ========== */

    /* === WHEN APP LOADS === */
    onAppLoad ({ dispatch }) {
      console.log('APP LOAD');
      dispatch('onIconClick', { selected: 'PAGE_LOAD' });
    }
    /* ========== */
  }
}