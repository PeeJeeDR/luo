import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import { fire } from '@/firebase/firebase';
import Ripple from 'vue-ripple-directive'

Vue.config.productionTip = false;

/* === DIRECTIVES === */
Vue.directive('ripple', Ripple);
/* ========== */

fire.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});