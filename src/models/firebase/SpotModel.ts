import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default class MemoModel {
  db: firebase.firestore.Firestore
  constructor() {
    this.db = firebase.firestore()
  }

  public async get(id: string) {
    let spot: any = undefined
    await this.db
      .collection('spots')
      .doc(id)
      .get()
      .then(doc => {
        spot = doc.exists ? doc.data() : null
      })
    return new Promise(resolve => {
      resolve({ data: spot })
    })
  }

  public async getList({ limit = 20, offset = 0 }) {
    const spots: firebase.firestore.DocumentData = []
    await this.db
      .collection('spots')
      .startAt(offset)
      .limit(limit)
      .get()
      .then(el => {
        el.forEach(doc => {
          spots.push(doc.data())
        })
      })
    return new Promise(resolve => {
      resolve({ data: spots })
    })
  }
}
