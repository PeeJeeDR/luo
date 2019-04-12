import Vue from 'vue';
import Router from 'vue-router';

/* === PAGES === */
import Authentication from '@/views/Authentication';
import Quizes from '@/views/Quizes';
/* ========== */

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/', 
      component: Quizes,
      props: {
        header: true
      }
    },
    { 
      path: '/login', 
      component: Authentication,
      props: {
        header: false
      }
    },
  ]
})
