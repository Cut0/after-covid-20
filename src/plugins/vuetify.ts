import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import {
  mdiHomeOutline,
  mdiMagnify,
  mdiCogOutline,
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
  mdiCloudUploadOutline,
  mdiCrownOutline,
  mdiSchoolOutline,
  mdiAlphaPCircleOutline,
  mdiLockReset,
  mdiArmFlexOutline,
  mdiBellOutline,
  mdiArrowLeft
} from '@mdi/js'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
    values: {
      home: mdiHomeOutline,
      search: mdiMagnify,
      notification: mdiBellOutline,
      config: mdiCogOutline,
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
      upload: mdiCloudUploadOutline,
      crown: mdiCrownOutline,
      working: mdiSchoolOutline,
      point: mdiAlphaPCircleOutline,
      reset: mdiLockReset,
      level: mdiArmFlexOutline,
      back: mdiArrowLeft
    }
  },
  theme: { dark: false }
})
