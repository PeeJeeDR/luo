/* === PACKAGES === */
import Vue from 'vue';
import Router from 'vue-router';
import { fire } from '@/firebase/firebase';
/* ========== */

/* === PAGES === */
import Authentication from '@/views/Authentication';
import Overview from '@/views/Overview';
import TestApi from '@/views/TestApi';
import CreateQuiz from '@/views/CreateQuiz';
/* ========== */

Vue.use(Router);

/* === ROUTES === */
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/', 
      component: Overview,
      name: 'Quiz overview',
      meta: {
        header: true,
        requiresAuth: false,
        leftIcon: 'hamburger'
      }
    },
    { 
      path: '/quizzes/create', 
      component: CreateQuiz,
      name: 'Create quiz',
      meta: {
        header: true,
        requiresAuth: true,
        leftIcon: 'back'
      }
    },
    { 
      path: '/authentication', 
      component: Authentication,
      name: 'Authenticate',
      meta: {
        header: false,
        requiresAuth: false,
        leftIcon: undefined
      }
    },
    { 
      path: '/test', 
      component: TestApi,
      name: 'Test api',
      meta: {
        header: false,
        requiresAuth: true,
        leftIcon: undefined
      }
    },
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        next('/')
      }
    }
  ]
});
/* ========== */

/* === CHECK IF ROUTE NEEDS AUTHENTICATION === */
router.beforeEach((to, from, next) => {
  const currentUser = fire.auth().currentUser;

  // SIGN OUT USER WHEN HE ROUTES TO AUTHENTICATION
  to.name === 'Authenticate' && fire.auth().signOut();

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