import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Notifications from '@/views/Notifications.vue'
import Config from '@/views/Config.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'ホーム',
    component: Home
  },
  {
    path: '/search',
    name: '検索',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
