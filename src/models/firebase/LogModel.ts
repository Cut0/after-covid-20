import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default class LogModel {
  db: firebase.firestore.Firestore
  constructor() {
    this.db = firebase.firestore()
  }

  public async get(id: string) {
    let log: any = undefined
    await this.db
      .collection('logs')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          log = doc.data()
          log.date = log.date.toDate()
        } else {
          log = null
        }
      })
    return new Promise(resolve => {
      resolve({ data: log })
    })
  }

  public async getList(uid: string, query: { startDate: Date; endDate: Date }) {
    const logs: firebase.firestore.DocumentData = []
    const startDate = firebase.firestore.Timestamp.fromDate(query.startDate)
    const endDate = firebase.firestore.Timestamp.fromDate(query.endDate)
    await this.db
      .collection('logs')
      .where('uid', '==', uid)
      .orderBy('date')
      .startAt(startDate)
      .endBefore(endDate)
      .get()
      .then(el => {
        el.forEach(doc => {
          const log = doc.data()
          log.date = log.date.toDate()
          logs.push(log)
        })
      })
    return new Promise(resolve => {
      resolve({ data: logs })
    })
  }

  public async getAll(uid: string) {
    const logs: firebase.firestore.DocumentData = []
    await this.db
      .collection('logs')
      .where('uid', '==', uid)
      .get()
      .then(el => {
        el.forEach(doc => {
          const log = doc.data()
          log.date = log.date.toDate()
          logs.push(log)
        })
      })
    logs.sort((a: any, b: any) => (a.date > b.date ? 1 : -1))
    return new Promise(resolve => {
      resolve({ data: logs })
    })
  }

  public async remove(id: string) {
    return await this.db
      .collection('logs')
      .where('uid', '==', id)
      .get()
      .then(el => {
        el.forEach(doc => {
          doc.ref.delete()
        })
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
