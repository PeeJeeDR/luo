import { db } from '@/firebase/firebase';
import moment from 'moment';

export const Reports = {
  namespaced: true,

  state: {
    quizToBeReported: undefined,
    currentQuestion: undefined
  },

  mutations: {
    SET_QUIZ_TO_BE_REPORTED (state, quiz) {
      state.quizToBeReported = quiz;
    },

    SET_CURRENT_QUESTION (state, question) {
      state.currentQuestion = question;
    }
  },
  
  actions: {
    // When there has been clicked on the report button in a quiz question.
    onReportClick ({ commit }, payload) {
      commit('SET_QUIZ_TO_BE_REPORTED', payload.quiz);
      commit('SET_CURRENT_QUESTION', payload.question)
    },

    // When there has been sumbitten in de report modal.
    postNewReport ({ dispatch }, payload) {
      const report = {
        quizId: payload.quizToBeReported.id,
        created: moment().format(),
        reportTypes: payload.selectedReports,
        reportedQuestion: payload.quizToBeReported.questions[payload.currentQuestion],
        reportMessage: payload.reportMessage
      }

      db.collection('reports').add(report).then(res => {
        dispatch('Notifications/setNotification', { message: 'Your report has saved successfully.' }, { root: true });
        dispatch('Modals/closeModal', {}, { root: true });
      }).catch(() => {
        dispatch('Notifications/setNotification', { message: 'Something went wrong by saving your report. Please try again later.' }, { root: true });
      });
    }
  }
}