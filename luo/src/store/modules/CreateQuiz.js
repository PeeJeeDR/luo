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
    },

    // Delete single question.
    DELETE_SINGLE_QUESTION (state, questionId) {
      let index = state.questions.map(question => question.id).indexOf(questionId);
      index > -1 && state.questions.splice(index, 1);
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
    },

    // Called when the user deletes a question while making a quiz.
    onQuestionDelete ({ commit }, payload) {
      commit('DELETE_SINGLE_QUESTION', payload.questionId);
    }
  }
}