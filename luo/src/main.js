import Vue from 'vue';
import App from './App.vue';
import './sw_cached_pages';
import router from './router';
import store from './store/store';
import { fire } from '@/firebase/firebase';
import Ripple from 'vue-ripple-directive';
import ImageUploader from 'vue-image-upload-resize'

Vue.config.productionTip = false;

// Directives
Vue.directive('ripple', Ripple);

// Plugins.
Vue.use(ImageUploader);

// Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw_cached_pages.js').then(res => {
      console.log('Service worker: Registered');
    }).catch(err => {
      console.log('Service worker: Error:', err);
    })
  })
}

let app;

fire.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});