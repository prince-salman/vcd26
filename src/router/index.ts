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
    // {
    //   path: '/sign-up',
    //   name: 'signUp',
    //   component: () => import('../views/SignUpView.vue')
    // },
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
  // Ambil session dari Supabase
  const { data: { session } } = await supabase.auth.getSession();
  
  // Cek meta tag di router (pastikan rute lo punya meta: { requiresAdmin: true/false })
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 1. Logika Halaman Admin
  if (requiresAdmin) {
    if (!session) {
      return next('/login');
    }
    const role = await getUserRole(session.user.id);
    return role === 'admin' ? next() : next('/user');
  }

  // 2. Logika Mencegah User yang sudah login akses halaman Login/Register
  if ((to.path === '/login' || to.path === '/register') && session) {
    const role = await getUserRole(session.user.id);
    return next(role === 'admin' ? '/admin' : '/user');
  }

  // 3. Logika Proteksi Halaman User (Dashboard)
  if (requiresAuth && !session) {
    return next('/login');
  }

  next();
});

export default router