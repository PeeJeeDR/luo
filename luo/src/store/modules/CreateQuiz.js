export const CreateQuiz = {
  namespaced: true,

  state: {
    questions: []
  },

  mutations: {
    // Push new question to the store.
    PUSH_QUESTION (state, question) {
      state.questions.push(question);
    },

    // Clear the questions array.
    CLEAR_QUESTIONS (state) {
      state.questions = [];
    }
  },

  actions: {
    // Called when there is a new question made.
    onQuestionFormSubmit ({ commit }, payload) {
      commit('PUSH_QUESTION', payload);
    },

    // Called when there is a new quiz made.
    onNewQuizPost ({ commit }) {
      commit('CLEAR_QUESTIONS');
    }
  }
}