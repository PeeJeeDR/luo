import router from '@/router';

export const CreateQuiz = {
  namespaced: true,

  state: {
    questions: [],
    isQRQuiz: false,
    editMode: false,
    quizToBeEdited: undefined,
    selectedQuestionId: undefined
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

    // Set QR code status.
    ENABLE_QR_QUIZ (state) {
      state.isQRQuiz = true;
    },
    DISABLE_QR_QUIZ (state) {
      state.isQRQuiz = false;
    },

    // Delete single question.
    DELETE_SINGLE_QUESTION (state, questionId) {
      if (state.editMode) {
        let index = state.quizToBeEdited.questions.map(question => question.id).indexOf(questionId);
        index > -1 && state.quizToBeEdited.questions.splice(index, 1);
      }

      if (!state.editMode) {
        let index = state.questions.map(question => question.id).indexOf(questionId);
        index > -1 && state.questions.splice(index, 1);
      }
    },

    // Set edit mode.
    ENABLE_EDIT_MODE (state) {
      state.editMode = true;
    },
    DISABLE_EDIT_MODE (state) {
      state.editMode = false;
    },

    // Set quiz to be edited.
    SET_QUIZ_TO_BE_EDITED (state, quiz) {
      state.quizToBeEdited = quiz;
    },
    RESET_QUIZ_TO_BE_EDITED (state) {
      state.quizToBeEdited = undefined;
    },

    // Set selected question id.
    SET_SELECTED_QUESTION_ID (state, questionId) {
      state.selectedQuestionId = questionId;
    },
    RESET_SELECTED_QUESTION_ID (state) {
      state.selectedQuestionId = undefined;
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
    },

    // When the add button in the bottom navigation is pressed.
    onNormalQuizCreate ({ commit }) {
      commit('DISABLE_QR_QUIZ');
      commit('DISABLE_EDIT_MODE');
      commit('RESET_QUIZ_TO_BE_EDITED');
    },

    // When the user selected make QR code quiz from the modal.
    onQRQuizCreate ({ commit }) {
      commit('ENABLE_QR_QUIZ');
    },

    // When the user clicked on the edit button in QuizInfo.
    onQuizEdit ({ commit, dispatch }, payload) {
      // Enable edit mode.
      commit('ENABLE_EDIT_MODE');

      // Set the quiz that needs to be edited.
      commit('SET_QUIZ_TO_BE_EDITED', payload.quiz);

      // Close the modal.
      dispatch('Modals/closeModal', {}, { root: true });

      // Open edit route.
      router.push('/quizzes/create');
    },

    // When the user clicked on the edit button of a question in CreateQuiz.
    onQuestionEdit ({ commit }, payload) {
      commit('SET_SELECTED_QUESTION_ID', payload.questionId);
    }
  }
}