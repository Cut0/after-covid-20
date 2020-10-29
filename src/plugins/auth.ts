import firebase from 'firebase'
import store from '@/store'
firebase.auth().onAuthStateChanged(user => {
  console.log('HELLO')
  console.log(user)
  store.dispatch('setUser', user)
  console.log('HELLO')
})
