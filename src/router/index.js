import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '@/views/indexView.vue'
import LoginView from '@/views/loginView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
