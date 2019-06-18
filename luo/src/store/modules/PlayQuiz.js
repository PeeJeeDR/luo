import { fire } from '@/firebase/firebase';

export const PlayQuiz = {
  namespaced: true,

  state: {
    playingQuiz: undefined,
    quizCompleted: false,
    inputEnabled: true,
    xp: 0,
    correctAnswers: 0,
    currentQuestion: 0,
    reviews: [],
    isPlaying: false
  },

  getters: {
    getScore (state) {
      let score = 0;

      state.reviews.forEach(review => {
        review.answers.forEach(answer => {
          score = answer.clicked && answer.correct ? score + 1 : score + 0;
        })
      });

      return score;
    }
  },

  mutations: {
    // Set and reset the quiz that has to be played.
    SET_PLAYING_QUIZ (state, quiz) {
      if (!state.isPlaying) {
        state.playingQuiz = quiz;
      }
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
    RESET_CORRECT_ANSWERS (state) {
      state.correctAnswers = 0;
    },

    // Set current question so the progress bars knows how long it has to be.
    SET_CURRENT_QUESTION (state, currentQuestion) {
      state.currentQuestion = currentQuestion + 1;
    },
    RESET_CURRENT_QUESTION (state) {
      state.currentQuestion = 0;
    },

    // Push answered question in the reviews array.
    PUSH_QUESTION_TO_REVIEWS (state, question) {
      state.reviews.push(question);
    },
    CLEAR_REVIEWS_ARRAY (state) {
      state.reviews = [];
    },

    SHUFFLE_ANSWERS (state) {
      let array = state.playingQuiz.questions[state.currentQuestion].answers;

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      state.playingQuiz.questions[state.currentQuestion].answers = array;
    },

    ENABLE_PLAYING (state) {
      state.isPlaying = true;
    },
    DISABLE_PLAYING (state) {
      state.isPlaying = false;
    },
  },

  actions: {
    // When the play button has been pressed.
    onPlayButtonClick ({ commit }, payload) {
      console.log('TEST');
      commit('DISABLE_PLAYING');
      commit('SET_PLAYING_QUIZ', payload.quiz);
      commit('ENABLE_PLAYING');
      commit('SHUFFLE_ANSWERS');
    },

    // When the player presses the X icon when playing a quiz.
    stopQuiz ({ commit }) {
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
      commit('DISABLE_PLAYING');
    },

    // When the user presses an answer.
    // Alter is to change the clicked state.
    pushQuestionToReviews ({ commit }, payload) {
      commit('DISABLE_INPUT');
      commit('PUSH_QUESTION_TO_REVIEWS', payload.question);
    },

    // Empty the reviews array when a new quiz has started.
    clearReviewsArray ({ commit }) {
      commit('CLEAR_REVIEWS_ARRAY');
    },

    // When a new question loads.
    onNewQuestionLoad ({ commit }, payload) {
      commit('ENABLE_INPUT');
      commit('SHUFFLE_ANSWERS');
    },

    // When the quiz completed.
    quizCompleted ({ commit, dispatch, state }) {
      commit('SET_QUIZ_COMPLETED_ON');
      commit('RESET_CURRENT_QUESTION');
      commit('DISABLE_PLAYING');

      if (fire.auth().currentUser === null && localStorage.sessionId !== null) {
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz, id: localStorage.sessionId }, { root: true });
      }

      if (fire.auth().currentUser !== null && state.playingQuiz.createdBy !== fire.auth().currentUser.uid) {
        dispatch('Quizzes/addQuizPlay', { quiz: state.playingQuiz, id: fire.auth().currentUser.uid }, { root: true });
      }
    },

    // When the continue button has been pressed on the end of a quiz.
    onQuizEnd ({ commit }) {
      commit('DISABLE_PLAYING');
      commit('RESET_CURRENT_QUESTION');
      commit('SET_QUIZ_COMPLETED_OFF');
      commit('ENABLE_INPUT');
      commit('RESET_CORRECT_ANSWERS');
    }
  }
}