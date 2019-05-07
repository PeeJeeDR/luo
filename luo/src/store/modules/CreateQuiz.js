export const CreateQuiz = {
  namespaced: true,

  state: {
    questions: []
  },

  mutations: {
    PUSH_QUESTION (state, question) {
      state.questions.push(question);
    }
  },

  actions: {
    onQuestionFormSubmit ({ commit }, payload) {
      commit('PUSH_QUESTION', payload);
    }
  }
}