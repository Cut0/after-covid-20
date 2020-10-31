import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Item } from '@/types'

export default class ItemModel {
  db: firebase.firestore.Firestore
  storage: firebase.storage.Storage
  constructor() {
    this.db = firebase.firestore()
    this.storage = firebase.storage()
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

  public async create(data: Item, imageUrl: string) {
    const id = this.db.collection('items').doc().id
    const imagePath = data.uid + '/' + id
    const ref = this.storage.ref().child(imagePath)
    data.id = id
    data.imagePath = imagePath
    return await Promise.all([
      this.db
        .collection('items')
        .doc(id)
        .set(data),
      ref.putString(imageUrl)
    ])
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
