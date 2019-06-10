import router from '@/router';

export const Modals = {
  namespaced: true,

  state: {
    modalType: '',
    modalIsOpen: false,
    overlay: false,
    confirmAnswer: undefined
  },

  mutations: {
    // Open modal handler.
    OPEN_MODAL (state) {
      state.modalIsOpen = true;
    },
    CLOSE_MODAL (state) {
      state.modalIsOpen = false;
    },

    // Set modal type. 
    // So the modal know which content needs to be rendered.
    SET_MODAL_TYPE (state, type) {
      state.modalType = type;
    },

    // Handle overlay.
    OPEN_OVERLAY (state) {
      state.overlay = true;
    },
    CLOSE_OVERLAY (state) {
      state.overlay = false;
    },

    // Set confirmed answer.
    SET_CONFIRM_ANSWER (state, confirmAnswer) {
      state.confirmAnswer = confirmAnswer;
    },
    CLEAR_CONFIRM_ANSWER (state) {
      state.confirmAnswer = undefined;
    }
  },

  actions: {
    openModal ({ commit }, payload) {
      commit('OPEN_MODAL');
      commit('OPEN_OVERLAY');
      commit('SET_MODAL_TYPE', payload.type);
    },

    closeModal ({ commit }) {
      commit('CLOSE_MODAL');
      commit('CLOSE_OVERLAY');
      commit('SET_MODAL_TYPE', '')
    },

    onConfirmAnswerSelect ({ commit, dispatch }, payload) {
      commit('SET_CONFIRM_ANSWER', payload.confirmAnswer);
      
      if (payload.confirmAnswer === 'leave') {
        dispatch('closeModal');
        router.push('/');
        commit('CLEAR_CONFIRM_ANSWER');
      }

      if (payload.confirmAnswer === 'stay') {
        dispatch('closeModal');
        commit('CLEAR_CONFIRM_ANSWER');
      }
    }
  }
}