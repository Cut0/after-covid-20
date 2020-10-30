import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Item } from '@/types'

export default class ItemModel {
  db: firebase.firestore.Firestore
  constructor() {
    this.db = firebase.firestore()
  }

  public async get(id: string) {
    let item: any = undefined
    await this.db
      .collection('items')
      .doc(id)
      .get()
      .then(doc => {
        item = doc.exists ? doc.data() : null
      })
    return new Promise(resolve => {
      resolve({ data: item })
    })
  }

  public async getList(uid: string, { limit = 20, offset = 0 }) {
    const items: firebase.firestore.DocumentData = []
    await this.db
      .collection('items')
      .startAt(offset)
      .limit(limit)
      .get()
      .then(el => {
        el.forEach(doc => {
          items.push(doc.data())
        })
      })
    return new Promise(resolve => {
      resolve({ data: items })
    })
  }

  public async getAll(uid: string) {
    const items: firebase.firestore.DocumentData = []
    await this.db
      .collection('items')
      .get()
      .then(el => {
        el.forEach(doc => {
          const item = doc.data()
          items.push(item)
        })
      })
    return new Promise(resolve => {
      resolve({ data: items })
    })
  }

  public async create(data: Item) {
    const id = this.db.collection('items').doc().id
    data.id = id
    return await this.db
      .collection('items')
      .doc(id)
      .set(data)
  }

  public async update(data: Item) {
    return await this.db
      .collection('items')
      .doc(data.id)
      .set(data)
  }

  public async remove(id: string) {
    return await this.db
      .collection('items')
      .doc(id)
      .delete()
  }
}
