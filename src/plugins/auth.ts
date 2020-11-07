import store from '@/store'
import UserModel from '@/models/firebase/UserModel'
//この時点ではSNSのプロフィールを変更しても反映されない

const userId = localStorage.getItem('userId')
if (userId) {
  new UserModel().get(userId).then((res: any) => {
    store.dispatch('setUser', res.data)
  })
} else store.dispatch('removeUser')
