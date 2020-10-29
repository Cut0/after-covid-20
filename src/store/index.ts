import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {} as firebase.User | null
  },
  mutations: {
    setUser: function(state, user) {
      state.isLogin = true
      state.user = user
    },
    removeUser(state) {
      state.isLogin = false
      state.user = {} as firebase.User | null
    }
  },
  actions: {
    setUser: function(store, user) {
      store.commit('setUser', user)
    },
    removeUser: function(store) {
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
