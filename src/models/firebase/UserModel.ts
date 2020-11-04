import * as firebase from 'firebase'
import 'firebase/firestore'
import { User } from '@/types'
import store from '@/store'

export default class MemoModel {
  db: firebase.firestore.Firestore
  constructor() {
    this.db = firebase.firestore()
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

  public async getList({ limit = 20, offset = 0 }) {
    const users: firebase.firestore.DocumentData = []
    await this.db
      .collection('users')
      .startAt(offset)
      .limit(limit)
      .get()
      .then(el => {
        el.forEach(doc => {
          users.push(doc.data())
        })
      })
    return new Promise(resolve => {
      resolve({ data: users })
    })
  }

  public async getAll() {
    const users: firebase.firestore.DocumentData = []
    await this.db
      .collection('users')
      .get()
      .then(el => {
        el.forEach(doc => {
          const user = doc.data()
          users.push(user)
        })
      })
    return new Promise(resolve => {
      resolve({ data: users })
    })
  }

  public async update(user: User) {
    return this.db
      .collection('users')
      .doc(user.id)
      .update(user)
      .then(() => {
        store.dispatch('setUser', user)
      })
  }
  /*
  public async remove(id: string) {
    await this.db
      .collection('users')
      .doc(id)
      .delete()
      .then(() => {
        store.dispatch('removeUser')
      })
  }

  */
  public isLogin() {
    return store.getters.isLogin as boolean
  }

  public currentData() {
    return store.getters.currentUser as User
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
