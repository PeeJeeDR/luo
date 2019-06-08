import app from '@/settings/app.json';

export const CreateQuiz = {
  namespaced: true,

  state: {
    quiz: {},
    questionId: undefined
  },

  mutations: {
    // Make questions key in the quiz object.
    ADD_QUESTIONS_KEY (state) {
      state.quiz.questions = [];
    },

    // Push a new question.
    PUSH_QUESTION (state, question) {
      state.quiz.questions.push(question);
    },

    // Update a question after edit.
    UPDATE_QUESTION (state, question) {
      state.quiz.questions[question.id] = question;
    },

    // Set and reset the selected question id.
    SET_QUESTION_ID (state, questionId) {
      state.questionId = questionId;
    },
    RESET_QUESTION_ID (state) {
      state.questionId = undefined;
    }
  },

  actions: {
    // When clicked on the create question button in CreateQuiz.vue.
    onNewQuestionButtonClick ({ dispatch }) {
      dispatch('Modals/openModal', { type: 'create-question' }, { root: true });
    },

    // When a new question is made.
    onQuestionCreate ({ state, dispatch, commit }, payload) {
      // If quiz.questions === undefined, we have to make this key in order to push questions to it.
      if (state.quiz.questions === undefined) {
        commit('ADD_QUESTIONS_KEY');
      }

      payload.question.id = state.quiz.questions.length;

      // Push the created question.
      commit('PUSH_QUESTION', payload.question);

      // Close modal
      dispatch('Modals/closeModal', {}, { root: true });
    },

    // When a question is edited.
    onQuestionEdit ({ state, dispatch, commit }, payload) {
      // Update question.
      commit('UPDATE_QUESTION', payload.question);
      
      // Close the modal.
      dispatch('Modals/closeModal', {}, { root: true });

      // Send back a notification.
      dispatch('Notifications/setNotification', { message: 'Failed to open question.' }, { root: true });
    },

    // When pressed the edit button of a question.
    openQuestionEdit ({ dispatch, commit }, payload) {
      commit('SET_QUESTION_ID', payload.questionId);

      if (payload.questionId !== undefined) {
        dispatch('Modals/openModal', { type: 'create-question' }, { root: true });
      }
      
      if (payload.questionId === undefined) {
        dispatch('Notifications/setNotification', { message: 'Failed to open question.' }, { root: true });
      }
    },

    // When the CreateQuestion modal is closed we need to reset the question id.
    onCreateQuestionDestory ({ commit }) {
      commit('RESET_QUESTION_ID');
    } 
  }
}