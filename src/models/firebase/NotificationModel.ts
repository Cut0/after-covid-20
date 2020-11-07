import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default class NotificationModel {
  db: firebase.firestore.Firestore
  constructor() {
    this.db = firebase.firestore()
  }

  public async get(id: string) {
    let notification: any = undefined
    await this.db
      .collection('notifications')
      .doc(id)
      .get()
      .then(doc => {
        notification = doc.exists ? doc.data() : null
      })
    return new Promise(resolve => {
      resolve({ data: notification })
    })
  }

  public async getList({ limit = 20, offset = 0 }) {
    const notifications: firebase.firestore.DocumentData = []
    await this.db
      .collection('notifications')
      .startAt(offset)
      .limit(limit)
      .get()
      .then(el => {
        el.forEach(doc => {
          notifications.push(doc.data())
        })
      })
    return new Promise(resolve => {
      resolve({ data: notifications })
    })
  }

  public async getAll() {
    const notifications: firebase.firestore.DocumentData = []
    await this.db
      .collection('notifications')
      .get()
      .then(el => {
        el.forEach(doc => {
          const notification = doc.data()
          notifications.push(notification)
        })
      })
    return new Promise(resolve => {
      resolve({ data: notifications })
    })
  }
}
