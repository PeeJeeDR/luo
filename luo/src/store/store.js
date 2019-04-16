import Vue from 'vue';
import Vuex from 'vuex';

/* === MODULES === */
import { Sidebar } from './modules/Sidebar';
/* ========== */

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Sidebar
  }
})
