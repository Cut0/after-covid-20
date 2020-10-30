import firebase from 'firebase'
import store from '@/store'
firebase.auth().onAuthStateChanged(user => {
  if (user) store.dispatch('setUser', user)
  else store.dispatch('removeUser', user)
})
