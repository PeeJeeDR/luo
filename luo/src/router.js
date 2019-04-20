/* === PACKAGES === */
import Vue from 'vue';
import Router from 'vue-router';
import { fire } from '@/firebase/firebase';
/* ========== */

/* === PAGES === */
import Authentication from '@/views/Authentication';
import Quizes from '@/views/Quizes';
/* ========== */

Vue.use(Router);

/* === ROUTES === */
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '*', 
      component: Authentication,
      meta: {
        header: false,
        requiresAuth: false
      }
    },
    { 
      path: '/', 
      component: Quizes,
      meta: {
        header: true,
        requiresAuth: true
      }
    },
    { 
      path: '/login', 
      component: Authentication,
      meta: {
        header: false,
        requiresAuth: false
      }
    },
  ]
});
/* ========== */

/* === CHECK IF ROUTE NEEDS AUTHENTICATION === */
router.beforeEach((to, from, next) => {
  const currentUser = fire.auth().currentUser;

  console.log('current user', currentUser);

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
/* ========== */

export default router;