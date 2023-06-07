import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginCheck from '../views/LoginCheck.vue'
import Register from '../views/UserRegister.vue'
import passwordFind from '../views/Password_find.vue'
import emailVerify from '../views/Email_verify.vue'
import Board1 from '../views/Board1.vue'
import Board1Write from '../views/BoardWrite.vue'
import Board2 from '../views/Board2.vue'
import Board3 from '../views/Board3.vue'
import Board4 from '../views/Board4.vue'
import Notice from '../views/Notice.vue'
import view from '../views/ContentView.vue'
import CompleteVerify from '../views/complete_verify.vue'
import users from '../views/Mypage.vue'
import MainPage from '../views/MainPage.vue'
import BoardEdit from '@/views/BoardEdit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: { requiresAuth: true }
    },
    {
      path: '/CompleteVerify',
      name: 'completeVerify',
      component: CompleteVerify,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/:BoardId/view/:postId',
      name: 'contentview',
      component: view,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/Notice',
      component: Notice,
      meta: { requiresAuth: true }
    },
    {
      path: '/BoardWrite',
      component: Board1Write,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/capstone',
      component: Board3,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/poom',
      component: Board4,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/tutoring',
      component: Board1,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/club',
      component: Board2,
      meta: { requiresAuth: true }
    },
    {
      path: '/Email_verify',
      component: emailVerify
    },
    {
      path: '/Password_find',
      name: 'Password_find',
      component: passwordFind
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/LoginCheck',
      name: 'LoginCheck',
      component: LoginCheck
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/Board/:BoardId/edit/:postId',
      name: 'BoardEdit',
      component: BoardEdit,
      meta: { requiresAuth: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    alert('로그인이 필요합니다.')
    next({ path: '/LoginCheck' })
  } else {
    next()
  }
})

export default router
