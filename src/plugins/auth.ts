import * as firebase from 'firebase/app'
import store from '@/store'
import { User } from '@/types'

//この時点ではSNSのプロフィールを変更しても反映されない
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const db = firebase.firestore()
    const userData: User = {
      id: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      petCode: null,
      petName: null,
      level: 0,
      point: 0,
      time: 0,
      tmpTime: 0,
      isWorking: false,
      monthlyTime: 0,
      monthlyPoint: 0,
      weeklyTime: 0,
      weeklyPoint: 0,
      dailyTime: 0,
      dailyPoint: 0,
      isComplated: false,
      lastSitDate: new Date(),
      lastStandDate: new Date(),
      petPhotoURL:
        'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/0%2Fa%2Fimage.png?alt=media&token=a4cebd91-5867-46c2-a736-1e6ddd307f67'
    }
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          db.collection('users')
            .doc(user.uid)
            .set(userData)
          store.dispatch('setUser', userData)
        } else {
          const user: any = doc.data()
          user.lastSitDate = user.lastSitDate.toDate()
          user.lastStandDate = user.lastStandDate.toDate()
          store.dispatch('setUser', user)
        }
      })
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
