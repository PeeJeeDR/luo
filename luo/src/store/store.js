import Vue from 'vue';
import Vuex from 'vuex';

/* === MODULES === */
import { Sidebar } from './modules/Sidebar';
import { Quizzes } from './modules/Quizzes';
import { Navigation } from './modules/Navigation';
import { Categories } from './modules/Categories';
import { Header } from './modules/Header';
/* ========== */

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Sidebar,
    Quizzes,
    Navigation,
    Categories,
    Header
  }
})
