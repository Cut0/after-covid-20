import Vue from 'vue'
import App from './App.vue'
import './plugins/composition-api'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import './plugins/firebase'
import './plugins/auth'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
