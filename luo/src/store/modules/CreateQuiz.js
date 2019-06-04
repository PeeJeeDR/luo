import router from '@/router';

export const CreateQuiz = {
  namespaced: true,

  state: {
    questions: [],
    isQRQuiz: false,
    editMode: false,
    quizToBeEdited: undefined,
    selectedQuestionId: undefined,
    isNewQuestion: false
  },

  mutations: {
    // Push new question to the store or to the quiz to be edited.
    PUSH_QUESTION (state, question) {
      state.questions.push(question);
    },
    PUSH_QUESTION_TO_BE_EDITED (state, question) {
      state.quizToBeEdited.questions.push(question);
    },

    // Clear the questions array.
    CLEAR_QUESTIONS (state) {
      state.questions = [];
    },

    // Update a question.
    UPDATE_QUESTION (state, quiz) {
      state.quizToBeEdited.questions[state.selectedQuestionId] = quiz;
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
    },

    // When the create question button has pressed.
    ENABLE_IS_NEW_QUESTION (state) {
      state.isNewQuestion = true;
    },
    DISABLE_IS_NEW_QUESTION (state) {
      state.isNewQuestion = false;
    } 
  },

  actions: {
    // Called when there is a new question made.
    onQuestionFormSubmit ({ state, commit, dispatch }, payload) {
      console.log('PAYLOAD', payload);

      if (state.editMode && state.isNewQuestion) {
        console.log('PUSH NEW QUESTION');
        commit('PUSH_QUESTION_TO_BE_EDITED', payload);
      }

      if (state.editMode) {
        console.log('EDIT QUESTION!');
        commit('UPDATE_QUESTION', payload);
      }

      if (!state.editMode) {
        console.log('CREATE NORMAL QUESTION');
        commit('PUSH_QUESTION', payload);
      } 
      
      dispatch('Modals/closeModal', {}, { root: true });
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
    onQuestionEdit ({ commit, dispatch }, payload) {
      commit('DISABLE_IS_NEW_QUESTION');
      commit('SET_SELECTED_QUESTION_ID', payload.questionId);
      dispatch('Modals/openModal', { type: 'create-question' }, { root: true });
    },

    // When the user clicked on the create new question button in CreateQuiz.
    // We need to tell the application that the user adds a new question instead of edit.
    onNewQuestionButton ({ commit, dispatch }) {
      commit('ENABLE_IS_NEW_QUESTION');
      dispatch('Modals/openModal', { type: 'create-question' }, { root: true });
    } 
  }
}