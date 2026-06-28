import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from "../lib/supabase";
import { getUserRole } from '../services/authService.ts';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/directory',
      name: 'directory',
      component: () => import('../views/DirectoryView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/media',
      name: 'media',
      component: () => import('../views/MediaView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminDashboard.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/UserDashboard.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
  ]
})

router.beforeEach(async (to, _from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (to.path === '/login') {
    if (session) {
      next('/user'); 
    } else {
      next(); 
    }
    return;
  }

  if ((requiresAuth || requiresAdmin) && !session) {
    next('/login'); 
    return;
  }

  if (requiresAdmin && session) {
    const role = await getUserRole(session.user.id);
    if (role === 'admin') {
      next(); 
    } else {
      next('/user'); 
    }
    return;
  }

  next();
});

export default router