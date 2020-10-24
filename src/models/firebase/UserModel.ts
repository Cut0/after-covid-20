import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { User } from '@/types'

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

  public async currentData() {
    const user = {}
    await firebase.auth().onAuthStateChanged(user => {
      user = user ? user : null
    })

    return new Promise(resolve => {
      resolve({ data: user })
    })
  }

  public async signIn(provider: any) {
    await firebase.auth().signInWithPopup(provider)
  }

  public async signOut() {
    firebase.auth().signOut()
  }
}
