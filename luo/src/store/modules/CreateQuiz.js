import app from '@/settings/app.json';
import clonedeep from 'lodash.clonedeep';
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
      quizSample: '',
      isPublic: true,
      isQRQuiz: false
    },
    questionId: undefined,
    mediaUploading: false,
    quizModified: false
  },

  mutations: {
    // Push a new question.
    PUSH_QUESTION (state, question) {
      state.quiz.questions.push(question);
      state.quizModified = true;
    },

    // Update a question after edit.
    UPDATE_QUESTION (state, question) {
      let newQuiz = clonedeep(state.quiz);

      
      newQuiz.questions[question.id] = question;

      state.quiz = newQuiz;
      state.quizModified = true;
    },

    // Delete a question.
    DELETE_QUESTION (state, questionId) {
      state.quiz.questions.splice(questionId, 1);
      state.quizModified = true;
    },

    // Quiz.
    UPDATE_QUIZ (state, quiz) {
      console.log('UPDATE QUIZ', quiz);
      state.quiz = quiz;
    },
    CLEAR_QUIZ (state) {
      console.log('CLEAR QUIZ');
      state.quiz = clonedeep(app.empty_quiz);
    },

    // Set and reset the selected question id.
    SET_QUESTION_ID (state, questionId) {
      state.questionId = questionId;
    },
    RESET_QUESTION_ID (state) {
      state.questionId = undefined;
    },

    // Media upload
    SET_MEDIA_UPLOADING_ON (state) {
      state.mediaUploading = true;
    },
    SET_MEDIA_UPLOADING_OFF (state) {
      state.mediaUploading = false;
    },

    // Reset modified state.
    RESET_MODIFIED (state) {
      state.quizModified = false;
    }
  },

  actions: {
    // When CreateQuiz.vue is created.
    onCreateQuizPageLoad ({ commit }) {
      commit('RESET_MODIFIED');
    },

    // When clicking the add button in BottomNavigation.vue.
    onNewQuizButtonClick ({ commit }) {
      commit('CLEAR_QUIZ');
      commit('RESET_QUESTION_ID');
    },

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
    onQuestionEdit ({ dispatch, commit, state }, payload) {
      console.log('PAYLOAD', payload);
      commit('UPDATE_QUESTION', payload.question);
      dispatch('Modals/closeModal', {}, { root: true });
      dispatch('Notifications/setNotification', { message: app.notifications.QUESTION_UPDATED_SUCCESS }, { root: true });
    },

    // When a question is deleted.
    onQuestionDelete ({ commit }, payload) {
      commit('DELETE_QUESTION', payload.questionId);
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

    // When clicked on the edit button of a quiz in QuizInfo.vue.
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
      if (payload.quiz.id === '') {
        payload.quiz.id = undefined;
      }

      console.log('PAYLOAD', payload );

      if (payload.quiz.id !== undefined) {
        db.collection('quizzes').doc(payload.quiz.id).get().then(doc => {
          if (doc.exists) {
            dispatch('Quizzes/updateQuiz', { quiz: payload.quiz }, { root: true });
          }
  
          if (!doc.exists) {
            dispatch('Quizzes/postNewQuiz', { quiz: payload.quiz }, { root: true });
          }
        }).catch(err => {
          dispatch('Notifications/setNotification', { message: 'Something went wrong while saving the quiz.' }, { root: true });
        })
      }

      if (payload.quiz.id === undefined) {
        dispatch('Quizzes/postNewQuiz', { quiz: payload.quiz }, { root: true }).then(() => {
          dispatch('Modals/closeModal', {}, { root: true });
          router.push('/');
        });
      }
    },

    onMediaUploadStart ({ commit }) {
      commit('SET_MEDIA_UPLOADING_ON');
    },

    onMediaUploadEnd ({ commit }) {
      commit('SET_MEDIA_UPLOADING_OFF')
    }
  }
}