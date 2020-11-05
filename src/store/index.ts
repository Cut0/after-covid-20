import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '@/types'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {} as User | null
  },
  mutations: {
    setUser: (state, user) => {
      state.isLogin = true
      state.user = user
    },
    removeUser: state => {
      state.isLogin = false
      state.user = {} as User | null
    }
  },
  actions: {
    setUser: (store, user) => {
      store.commit('setUser', user)
      localStorage.setItem('userId', user.id)
    },
    removeUser: store => {
      store.commit('removeUser')
      localStorage.removeItem('userId')
    }
  },
  getters: {
    isLogin: state => {
      return state.isLogin
    },
    currentUser: state => {
      return state.user
    }
  }
})
