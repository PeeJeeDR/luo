import { fire } from '@/firebase/firebase';

export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizCompleted: false,
    inputEnabled: true,
    xp: 0,
    correctAnswers: 0,
    currentQuestion: 0
  },

  mutations: {
    // Set the quiz that has to be played.
    SET_PLAYING_QUIZ (state, quiz) {
      state.playingQuiz = quiz;
    },

    // Set quiz playing state.
    SET_QUIZ_COMPLETED_ON (state) {
      state.quizCompleted = true;
    },
    SET_QUIZ_COMPLETED_OFF (state) {
      state.quizCompleted = false;
    },

    // Enable and disable input state so the user cant press another button
    // when going to the next question.
    ENABLE_INPUT (state) {
      state.inputEnabled = true;
    },
    DISABLE_INPUT (state) {
      state.inputEnabled = false;
    },

    // Add correct or wrong answer so we know what the score is.
    ADD_CORRECT_ANSWER (state) {
      state.correctAnswers += 1;
    },
    RESET_CORRECT_ANSWERS (state) {
      state.correctAnswers = 0;
    },

    // Set the clicked answer so we now on the quiz review which one was pressed.
    SET_CLICKED_ANSWER (state, payload) {
      state.playingQuiz.questions[payload.currentQuestion].answers[payload.clickedAnswerId].clicked = true;
    },

    // Set current question so the progress bars knows how long it has to be.
    SET_CURRENT_QUESTION (state, payload) {
      state.currentQuestion = payload.currentQuestion + 1;
    },
    RESET_CURRENT_QUESTION (state) {
      state.currentQuestion = 0;
    },

    SHUFFLE_ANSWERS (state) {
      console.log('SHUFFLE');
      /* let array = state.playingQuiz.questions[state.currentQuestion].answers;

      console.log('ARRAY BEFORE', array);

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      console.log('ARRAY AFTER', array);

      state.playingQuiz.questions[state.currentQuestion].answers = array; */
    }
  },

  actions: {
    // When the play button has been pressed.
    onPlayButtonClick ({ commit }, payload) {
      commit('SET_PLAYING_QUIZ', payload.quiz);
    },

    // When the player presses the X icon when playing a quiz.
    stopQuiz ({ commit }) {
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
    },

    // When the user presses an answer.
    // Alter is to change the clicked state.
    onAnswerClick ({ commit }, payload) {
      if (payload.currentQuestion !== undefined) {
        commit('SET_CURRENT_QUESTION', payload);
      }
      
      if (payload.type === 'alter') {
        commit('SET_CLICKED_ANSWER', payload);
      }

      if (payload.type === 'correct') {
        commit('ADD_CORRECT_ANSWER');
      }

      commit('DISABLE_INPUT');
    },

    // When a new question loads.
    onNewQuestionLoad ({ commit }) {
      commit('ENABLE_INPUT');
      commit('SHUFFLE_ANSWERS');
    },

    // When the quiz completed.
    quizCompleted ({ commit, dispatch, state }) {
      commit('SET_QUIZ_COMPLETED_ON');
      commit('RESET_CURRENT_QUESTION');

      if (fire.auth().currentUser === null && localStorage.sessionId !== null) {
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz, id: localStorage.sessionId }, { root: true });
      }

      if (fire.auth().currentUser !== null && state.playingQuiz.createdBy !== fire.auth().currentUser.uid) {
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz, id: fire.auth().currentUser.uid }, { root: true });
      }
    },

    // When the continue button has been pressed on the end of a quiz.
    onQuizEnd ({ commit }) {
      commit('RESET_CURRENT_QUESTION');
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
    }
  }
}