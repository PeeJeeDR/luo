import { db } from '@/firebase/firebase';

export const Categories = {
  namespaced: true,

  state: {
    categories: [],
    loading: false
  },

  mutations: {
    // Save categories to the store.
    SAVE_CATEGORIES (state, categories) {
      state.categories = categories;
      state.categories.push({
        category: 'Suggest category',
        id: 0,
        slug: 'add'
      })
    },

    // Loading state handlers.
    SET_LOADING_ON (state) {
      state.loading = true;
    },
    SET_LOADING_OFF (state) {
      state.loading = false;
    }
  },

  actions: {
    // Fetch all categories in sidebar.
    fetchCategories ({ commit }) {
      commit('SET_LOADING_ON');

      db.collection('categories').orderBy('category', 'asc').onSnapshot(snap => {
        const mapped = snap.docs.map(doc => {
          const copy = doc.data();
          copy.id = doc.id;
          
          return copy;
        });

        commit('SAVE_CATEGORIES', mapped);
        commit('SET_LOADING_OFF');
      });
    },

    // When there is a category suggested.
    onCategorySuggestion ({ commit }, payload) {
      console.log('input', payload.input);
    }
  }
}