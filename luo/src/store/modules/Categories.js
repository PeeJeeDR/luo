import { db } from '@/firebase/firebase';

export const Categories = {
  namespaced: true,

  state: {
    categories: []
  },

  mutations: {
    SAVE_CATEGORIES (state, categories) {
      state.categories = categories;
    }
  },

  actions: {
    fetchCategories ({ commit }) {
      db.collection('categories').orderBy('category', 'asc').onSnapshot(snap => {
        commit('SAVE_CATEGORIES', snap.docs.map(doc => doc.data()));
      });
    }
  }
}