import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from "../lib/supabase";
import { getUserRole } from '../services/authService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mahasiswa',
      name: 'mahasiswa',
      component: () => import('../views/MahasiswaView.vue')
    },
    {
      path: '/galeri',
      name: 'galeri',
      component: () => import('../views/GaleriView.vue')
    },
    {
      path: '/akademik',
      name: 'akademik',
      component: () => import('../views/AkademikView.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/commission',
      name: 'commission',
      component: () => import('../views/CommissionView.vue')
    },
    {
      path: '/kontak',
      name: 'kontak',
      component: () => import('../views/KontakView.vue')
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
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/UserDashboard.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, _from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAdmin) {
    if (!session) {
      return next('/login');
    }
    const role = await getUserRole(session.user.id);
    return role === 'admin' ? next() : next('/user');
  }

  if ((to.path === '/login' || to.path === '/register') && session) {
    const role = await getUserRole(session.user.id);
    return next(role === 'admin' ? '/admin' : '/user');
  }

  if (requiresAuth && !session) {
    return next('/login');
  }

  next();
});

export default router