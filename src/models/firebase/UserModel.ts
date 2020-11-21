import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { User } from '@/types'
import store from '@/store'

export default class UserModel {
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
        if (doc.exists) {
          user = doc.data()
          user.lastSitDate = user.lastSitDate.toDate()
          user.lastStandDate = user.lastStandDate.toDate()
        } else {
          user = null
        }
      })
    return new Promise(resolve => {
      resolve({ data: user })
    })
  }

  public async getList({ limit = 20 }, sortkey = 'id') {
    const users: firebase.firestore.DocumentData = []
    await this.db
      .collection('users')
      .orderBy(sortkey, 'desc')
      .limit(limit)
      .get()
      .then(el => {
        el.forEach(doc => {
          if (doc.data().isComplated) users.push(doc.data())
        })
      })
    return new Promise(resolve => {
      resolve({ data: users })
    })
  }

  public async getAll(sortkey = 'id') {
    const users: firebase.firestore.DocumentData = []
    await this.db
      .collection('users')
      .orderBy(sortkey, 'desc')
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

  public async create(user: User) {
    return this.db
      .collection('users')
      .doc(user.id)
      .set(user)
  }

  public async update(user: User) {
    console.log(user)
    await this.db
      .collection('users')
      .doc(user.id)
      .update(user)
    return user
  }

  public async remove(id: string) {
    await this.db
      .collection('users')
      .doc(id)
      .delete()
  }

  public isLogin() {
    return store.getters.isLogin as boolean
  }

  public currentData() {
    return store.getters.currentUser as User
  }

  public signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  public signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  public signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  public async signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => store.dispatch('removeUser'))
  }
}
