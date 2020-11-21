import * as firebase from 'firebase/app'
import store from '@/store'
import { User } from '@/types'
import UserComponent from '@/modules/firebase/user'

//この時点ではSNSのプロフィールを変更しても反映されない
const db = firebase.firestore()
firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const userComponent = UserComponent()
    await userComponent.get(user.uid)
    const currentUser = userComponent.user.value
    if (currentUser) store.dispatch('setUser', currentUser)
    else {
      const now = new Date()
      const userData: User = {
        id: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        petName: null,
        level: 0,
        point: 0,
        time: 0,
        isWorking: false,
        monthlyTime: 0,
        monthlyPoint: 0,
        weeklyTime: 0,
        weeklyPoint: 0,
        dailyTime: 0,
        dailyPoint: 0,
        isComplated: false,
        lastSitDate: now,
        lastStandDate: new Date(now.setHours(now.getHours() - 1)),
        petPhotoURL:
          'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/0%2Fb%2Fimage.png?alt=media&token=6f9605bf-1661-4baf-a28a-7592e46d3d4a'
      }
      await userComponent.create(userData)
      store.dispatch('setUser', userData)
    }
    db.collection('users')
      .doc(user.uid)
      .onSnapshot(function(doc) {
        const user: any = doc.data()
        if (user) {
          user.lastSitDate = user.lastSitDate.toDate()
          user.lastStandDate = user.lastStandDate.toDate()
          store.dispatch('setUser', user)
        }
      })
  } else store.dispatch('removeUser')
})
