import { db } from '@/firebase/firebase';

export const Categories = {
  namespaced: true,

  state: {
    categories: [],
    loading: false
  },

  mutations: {
    /* === SAVE ALL CATEGORIES === */
    SAVE_CATEGORIES (state, categories) {
      state.categories = categories;
    },
    /* ========== */

    /* === LOADING === */
    SET_LOADING_ON (state) {
      state.loading = true;
    },

    SET_LOADING_OFF (state) {
      state.loading = false;
    }
    /* ========== */
  },

  actions: {
    /* === FETCH ALL CATEGORIES === */
    fetchCategories ({ commit }) {
      commit('SET_LOADING_ON');

      db.collection('categories').orderBy('category', 'asc').onSnapshot(snap => {
        console.log('SNAP COLLECT CATEGORIES', snap);
        const mapped = snap.docs.map(doc => {
          const copy = doc.data();
          copy.id = doc.id;
          
          return copy;
        });

        commit('SAVE_CATEGORIES', mapped);
        commit('SET_LOADING_OFF');
      });
    }
    /* ========== */
  }
}