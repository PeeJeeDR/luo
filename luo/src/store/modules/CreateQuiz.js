import app from '@/settings/app.json';
import { db } from '@/firebase/firebase'; 
import router from '@/router';

export const CreateQuiz = {
  namespaced: true,

  state: {
    quiz: {
      title: '',
      description: '',
      questions: [],
      categories: [],
      quizImg: '',
      sampleImg: '',
      userId: '',
      isPublic: true
    },
    questionId: undefined
  },

  mutations: {
    // Push a new question.
    PUSH_QUESTION (state, question) {
      state.quiz.questions.push(question);
    },

    // Update a question after edit.
    UPDATE_QUESTION (state, question) {
      state.quiz.questions[question.id] = question;
    },

    UPDATE_QUIZ (state, quiz) {
      state.quiz = quiz;
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
      payload.question.id = state.quiz.questions.length;

      commit('PUSH_QUESTION', payload.question);
      dispatch('Modals/closeModal', {}, { root: true });
    },

    // When a question is edited.
    onQuestionEdit ({ dispatch, commit }, payload) {
      commit('UPDATE_QUESTION', payload.question);
      dispatch('Modals/closeModal', {}, { root: true });
      dispatch('Notifications/setNotification', { message: app.notifications.QUESTION_UPDATED_SUCCESS }, { root: true });
    },

    // When pressed the edit button of a question.
    onQuestionEditButtonClick ({ dispatch, commit }, payload) {
      commit('SET_QUESTION_ID', payload.questionId);

      if (payload.questionId !== undefined) {
        dispatch('Modals/openModal', { type: 'create-question' }, { root: true });
      }
      
      if (payload.questionId === undefined) {
        dispatch('Notifications/setNotification', { message: 'Failed to open question.' }, { root: true });
      }
    },

    onQuizEditButtonClick ({ commit, dispatch }, payload) {
      commit('UPDATE_QUIZ', payload.quiz);
      dispatch('Modals/closeModal', {}, { root: true });
      router.push('quizzes/create');
    },

    // When the CreateQuestion modal is closed we need to reset the question id.
    onCreateQuestionModalDestory ({ commit }) {
      commit('RESET_QUESTION_ID');
    },

    // When the form is submitted in SaveQuiz.vue.
    // We need to check first if the document already exists and react based on the result.
    onQuizFormSubmit ({ dispatch }, payload) {
      db.collection('quizzes').doc(payload.quiz.id).get().then(doc => {
        if (doc.exists) {
          dispatch('Quizzes/updateQuiz', { quiz: payload.quiz }, { root: true });
        }

        if (!doc.exists) {
          dispatch('Quizzes/postNewQuiz', { quiz: payload.quiz }, { root: true });
        }
      }).catch(() => {
        this.$store.dispatch('Notifications/setNotification', { message: 'Something went wrong while saving the quiz.' });
      })
    }
  }
}