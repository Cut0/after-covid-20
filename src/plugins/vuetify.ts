import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import {
  mdiHomeOutline,
  mdiMagnify,
  mdiBell,
  mdiCogOutline,
  mdiVirusOutline
} from '@mdi/js'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
    values: {
      home: mdiHomeOutline,
      search: mdiMagnify,
      notification: mdiBell,
      setting: mdiCogOutline,
      virus: mdiVirusOutline
    }
  },
  theme: { dark: false }
})
