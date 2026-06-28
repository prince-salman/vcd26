import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from "../lib/supabase";
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
      component: () => import('../views/AdminDashboard.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.path === '/admin' && !session) {
    next('/login')
    return
  }

  next()
})

export default router