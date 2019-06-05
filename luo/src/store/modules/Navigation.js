import router from '../../router';
import { enableBodyScroll } from 'body-scroll-lock';

export const Navigation = {
  namespaced: true,

  state: {
    selectedOverview: 'new',
  },

  mutations: {
    // Set selected overview.
    SET_SELECTED_OVERVIEW (state, selected) {
      state.selectedOverview = selected;
    },
  },

  actions: {
    // On icon click in the bottom nav.
    onIconClick ({ commit, dispatch, state, rootState }, payload) {
      const isOtherUser = rootState.Users.isOtherUser;

      // Enable scrolling on the document.
      enableBodyScroll(document.getElementsByTagName('body')[0]);

      // Reset selected category in the sidebar.
      dispatch('Sidebar/onBottomNavigationPress', {}, { root: true });

      if (payload.selected !== state.selectedOverview || payload.firstLoad) {
        switch (payload.selected) {
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

          case 'qr':
            // Open quiz overview.
            router.push('/');
          break;

          case 'profile':
            // Open profile page.
            router.push('/profile');
          break;
        }
      }

      // Set the selected overview.
      commit('SET_SELECTED_OVERVIEW', payload.selected);

      // Set header props on icon click.
      commit('Header/SET_HEADER_TITLE', payload.selected === 'qr' ? 'QR code scanner' : payload.selected, { root: true });
    },

    // When te app loads.
    onAppLoad ({ state, dispatch }) {
      dispatch('onIconClick', { selected: state.selectedOverview, firstLoad: true });
    },

    // When the avatar of the user in QuizInfo has been clicked.
    onQuizInfoAvatarClick ({ state, commit, dispatch }, payload) {
      // Save the user in the Users state.
      dispatch('Users/onQuizInfoAvatarClick', { user: payload.user }, { root: true });

      // Set the selected overview.
      commit('SET_SELECTED_OVERVIEW', 'profile');

      // Change header style.
      commit('Header/SET_HEADER_TITLE', state.selectedOverview, { root: true });

      // Close the modal.
      dispatch('Modals/closeModal', {}, { root: true });

      // Go to the profile page.
      router.push('/profile');
    }
  }
}