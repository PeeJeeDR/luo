// Packages.
import Vue from 'vue';
import Router from 'vue-router';
import { fire } from '@/firebase/firebase';

// Pages.
import Authentication from '@/views/Authentication';
import Overview from '@/views/Overview';
import Profile from '@/views/Profile';
import CreateQuiz from '@/views/CreateQuiz';
import PlayQuiz from '@/views/PlayQuiz';

Vue.use(Router);

// Routes.
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
      path: '/play/quiz', 
      component: PlayQuiz,
      name: 'Play quiz',
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
      path: '*',
      beforeEnter: (to, from, next) => {
        next('/')
      }
    }
  ]
});

// Check if route needs authentication.
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

export default router;