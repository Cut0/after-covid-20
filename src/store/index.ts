import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {} as firebase.User | null
  },
  mutations: {
    setUser: (state, user) => {
      state.isLogin = true
      state.user = user
    },
    removeUser: state => {
      state.isLogin = false
      state.user = {} as firebase.User | null
    }
  },
  actions: {
    setUser: (store, user) => {
      store.commit('setUser', user)
    },
    removeUser: store => {
      store.commit('removeUser')
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
