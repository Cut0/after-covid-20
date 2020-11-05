import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Ranking from '@/views/Ranking.vue'
import Notifications from '@/views/Notifications.vue'
import Config from '@/views/Config.vue'
import User from '@/views/User.vue'
import UserComponent from '@/modules/firebase/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/ranking',
    name: 'ランキング',
    component: Ranking
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
    path: '/',
    name: 'ホーム',
    component: Home
  },
  {
    path: '/:id',
    name: 'ユーザー',
    component: User
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
