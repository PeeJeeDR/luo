import { db } from '@/firebase/firebase';
import app from '@/settings/app.json';

export const categoriesWithSuggest = () => {
  let categories = app.categories.sort((a, b) => a.slug.localeCompare(b.slug));
  categories.push({ category: 'Suggest category', slug: 'suggest' });
  return categories;
}

export const Categories = {
  namespaced: true,

  state: {
    categories: categoriesWithSuggest(),
  },

  actions: {
    // When there is a category suggested.
    async onCategorySuggestion ({ dispatch }, payload) {
      // Post suggestion to firestore and send mail to admin with cloud function.
      await db.collection('category-suggestions').add({
        category: payload.input
      });

      // Close the modal.
      await dispatch('Modals/closeModal', {}, { root: true });

      // Show notification to the user.
      dispatch('Notifications/setNotification', { 
        message: 'Your feedback has been noticed.' 
      }, { root: true });
    }
  }
}