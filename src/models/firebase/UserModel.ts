import * as firebase from 'firebase'
import 'firebase/firestore'
import { User } from '@/types'
import store from '@/store'

export default class MemoModel {
  db: firebase.firestore.Firestore
  constructor() {
    this.db = firebase.firestore()
  }

  public async create(user: User) {
    await this.db.collection('users').add(user)
  }

  public async update(id: string, user: User) {
    await this.db
      .collection('users')
      .doc(id)
      .update(user)
  }

  public async get(id: string) {
    let user: any = undefined
    await this.db
      .collection('users')
      .doc(id)
      .get()
      .then(doc => {
        user = doc.exists ? doc.data() : null
      })
    return new Promise(resolve => {
      resolve({ data: user })
    })
  }

  public async remove(id: string) {
    await this.db
      .collection('users')
      .doc(id)
      .delete()
  }

  public isLogin() {
    return store.getters.isLogin
  }

  public currentData() {
    return store.getters.currentUser
  }

  public async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  public async signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  public async signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  public async signOut() {
    firebase.auth().signOut()
  }
}
