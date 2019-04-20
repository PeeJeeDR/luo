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
      path: '/', 
      component: Quizes,
      name: 'quizzes',
      meta: {
        header: true,
        requiresAuth: true
      }
    },
    { 
      path: '/authentication', 
      component: Authentication,
      name: 'authentication',
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

  // SIGN OUT USER WHEN HE ROUTES TO AUTHENTICATION
  to.name === 'authentication' && fire.auth().signOut();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/authentication');
  } 
  else if (requiresAuth && currentUser) {
    next();
  } 
  else {
    next();
  }
});
/* ========== */

export default router;