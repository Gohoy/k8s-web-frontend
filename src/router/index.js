import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '@/views/indexView.vue'
import LoginView from '@/views/loginView.vue'
import CreatePod from '@/views/createPod.vue'
import ManagePod from '@/views/managePod.vue'
import RegisterView from '@/views/registerView.vue'
import UserInfo from '@/views/userInfo.vue'
import UserManage from '@/views/admin/userManage.vue'
import CtrManage from '@/views/admin/ctrManage.vue'
import VmManage from '@/views/admin/vmManage.vue'
const routes = [
  {
    path: '/index',
    name: 'home',
    component: IndexView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/createPod',
    name: 'createPod',
    component: CreatePod
  },
  {
    path: '/managePod',
    name: 'managePod',
    component: ManagePod
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfo
  }, {
    path: '/ctrManage',
    name: 'ctrManage',
    component: CtrManage
  }, {
    path: '/userManage',
    name: 'userManage',
    component: UserManage
  }, {
    path: '/vmManage',
    name: 'vmManage',
    component: VmManage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
