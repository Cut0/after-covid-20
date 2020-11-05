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

  public async getList({ limit = 20, offset = 0 }, sortkey = 'id') {
    const users: firebase.firestore.DocumentData = []
    await this.db
      .collection('users')
      .orderBy(sortkey, 'desc')
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
    const res = await firebase.auth().signInWithPopup(provider)
    if (res.user) {
      const userData: any = await this.get(res.user?.uid)
      if (userData.data) store.dispatch('setUser', userData.data)
      else {
        this.create({
          id: res.user.uid,
          photoURL: res.user.photoURL,
          displayName: res.user.displayName,
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
        })
      }
    }
    return
  }

  public async signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()
    const res = await firebase.auth().signInWithPopup(provider)
    if (res.user) {
      const userData: any = await this.get(res.user?.uid)
      if (userData.data) store.dispatch('setUser', userData.data)
      else {
        this.create({
          id: res.user.uid,
          photoURL: res.user.photoURL,
          displayName: res.user.displayName,
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
        })
      }
    }
    return
  }

  public async signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    const res = await firebase.auth().signInWithPopup(provider)
    if (res.user) {
      const userData: any = await this.get(res.user?.uid)
      if (userData.data) store.dispatch('setUser', userData.data)
      else {
        this.create({
          id: res.user.uid,
          photoURL: res.user.photoURL,
          displayName: res.user.displayName,
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
        })
      }
    }
    return
  }

  public async signOut() {
    store.dispatch('removeUser')
  }
}
