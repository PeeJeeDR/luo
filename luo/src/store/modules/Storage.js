import { storage } from '@/firebase/firebase';

export const Storage = {
  namespaced: true,

  state: {
    
  },

  mutations: {
    
  },

  getters: {
    
  },

  actions: {
    uploadFile ({ commit }, payload) {
      const name = payload.file.name;
      const meta = { contentType: payload.file.type }

      // upload img
      storage.child(name).put(payload.file, meta).then(snap => snap.ref.getDownloadURL()).then(url => {
        console.log('url', url);
      }).catch(() => {});
      console.log('payload', payload);
    }
  }
}