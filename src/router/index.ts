import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Notifications from '@/views/Notifications.vue'
import Config from '@/views/Config.vue'
import UserComponent from '@/modules/firebase/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/search',
    name: '検索',
    component: Search
  },
  {
    path: '/ranking',
    name: 'ランキング',
    component: Search
  },
  {
    path: '/notifications',
    name: '通知一覧',
    component: Notifications
  },
  {
    path: '/config',
    name: '設定',
    component: Config
  },
  {
    path: '/home',
    name: 'ホーム',
    component: Home
  },
  {
    path: '/:id',
    name: 'ユーザー',
    component: Config
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const userComponent = UserComponent()
router.beforeEach((to, from, next) => {
  if (
    to.name === 'ユーザー' &&
    userComponent.isLogin &&
    to.params.id === userComponent.currentUser.value.id
  )
    next({ name: 'ホーム' })
  else next()
})

export default router
