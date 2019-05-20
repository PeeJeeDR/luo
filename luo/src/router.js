/* === PACKAGES === */
import Vue from 'vue';
import Router from 'vue-router';
import { fire } from '@/firebase/firebase';
/* ========== */

/* === PAGES === */
import Authentication from '@/views/Authentication';
import Overview from '@/views/Overview';
import Profile from '@/views/Profile';
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
        header: {
          enabled: true
        },
        bottomNav: {
          enabled: true
        },
        requiresAuth: false,
      }
    },
    { 
      path: '/profile', 
      component: Profile,
      name: 'Profile',
      meta: {
        header: {
          enabled: true
        },
        bottomNav: {
          enabled: true
        },
        requiresAuth: false,
      }
    },
    { 
      path: '/quizzes/create', 
      component: CreateQuiz,
      name: 'Create quiz',
      meta: {
        header: {
          enabled: true
        },
        bottomNav: {
          enabled: false
        },
        requiresAuth: true,
      }
    },
    { 
      path: '/authentication', 
      component: Authentication,
      name: 'Authenticate',
      meta: {
        header: {
          enabled: false
        },
        bottomNav: {
          enabled: false
        },
        requiresAuth: false,
      }
    },
    { 
      path: '/test', 
      component: TestApi,
      name: 'Test api',
      meta: {
        header: {
          enabled: false
        },
        bottomNav: {
          enabled: false
        },
        requiresAuth: true
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

  // Sign out user when he routes to /authentication
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