import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import {
  mdiHomeOutline,
  mdiMagnify,
  mdiBell,
  mdiCogOutline,
  mdiVirusOutline,
  mdiGoogle,
  mdiTwitter,
  mdiFacebook,
  mdiLogout,
  mdiExitRun
} from '@mdi/js'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
    values: {
      home: mdiHomeOutline,
      search: mdiMagnify,
      notification: mdiBell,
      config: mdiCogOutline,
      virus: mdiVirusOutline,
      google: mdiGoogle,
      twitter: mdiTwitter,
      facebook: mdiFacebook,
      logout: mdiLogout,
      exit: mdiExitRun
    }
  },
  theme: { dark: false }
})
