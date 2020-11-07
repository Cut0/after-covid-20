import * as firebase from 'firebase'
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
      isWorking: false,
      monthlyTime: 0,
      monthlyPoint: 0,
      weeklyTime: 0,
      weeklyPoint: 0,
      dailyTime: 0,
      dailyPoint: 0,
      isComplated: false
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
        } else store.dispatch('setUser', doc.data())
      })
    db.collection('users')
      .doc(user.uid)
      .onSnapshot(function(doc) {
        store.dispatch('setUser', doc.data())
      })
  } else store.dispatch('removeUser')
})
