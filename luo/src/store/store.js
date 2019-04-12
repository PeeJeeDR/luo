import Vue from 'vue';
import Vuex from 'vuex';

/* === MODULES === */
import { Header } from './modules/Header';
import { Sidebar } from './modules/Sidebar';
/* ========== */

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Header,
    Sidebar
  }
})
