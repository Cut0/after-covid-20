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
  mdiExitRun,
  mdiImage,
  mdiPencil,
  mdiClose,
  mdiAccountCircle,
  mdiPlus,
  mdiDelete,
  mdiStar,
  mdiStarOutline,
  mdiStarHalfFull,
  mdiCloudUploadOutline
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
      exit: mdiExitRun,
      image: mdiImage,
      edit: mdiPencil,
      close: mdiClose,
      account: mdiAccountCircle,
      plus: mdiPlus,
      delete: mdiDelete,
      star: mdiStar,
      starOutline: mdiStarOutline,
      starHalf: mdiStarHalfFull,
      upload: mdiCloudUploadOutline
    }
  },
  theme: { dark: false }
})
