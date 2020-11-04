import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Log } from '@/types'

export default class LogModel {
  db: firebase.firestore.Firestore
  storage: firebase.storage.Storage
  constructor() {
    this.db = firebase.firestore()
    this.storage = firebase.storage()
  }

  public async get(id: string) {
    let log: any = undefined
    await this.db
      .collection('Logs')
      .doc(id)
      .get()
      .then(doc => {
        log = doc.exists ? doc.data() : null
      })
    return new Promise(resolve => {
      resolve({ data: log })
    })
  }

  public async getList(uid: string, { limit = 20, offset = 0 }) {
    const logs: firebase.firestore.DocumentData = []
    await this.db
      .collection('logs')
      .where('uid', '==', uid)
      .startAt(offset)
      .limit(limit)
      .get()
      .then(el => {
        el.forEach(doc => {
          logs.push(doc.data())
        })
      })
    return new Promise(resolve => {
      resolve({ data: logs })
    })
  }

  public async getAll(uid: string) {
    const Logs: firebase.firestore.DocumentData = []
    await this.db
      .collection('logs')
      .where('uid', '==', uid)
      .get()
      .then(el => {
        el.forEach(doc => {
          const Log = doc.data()
          Logs.push(Log)
        })
      })
    return new Promise(resolve => {
      resolve({ data: Logs })
    })
  }
  /*
  public async create(data: Log) {
    return this.db.collection('logs').add(data)
  }
  
  public async update(data: Log) {
    return await this.db
      .collection('Logs')
      .doc(data.id)
      .set(data)
  }

  public async remove(id: string) {
    return await this.db
      .collection('Logs')
      .doc(id)
      .delete()
  }
  */
}
