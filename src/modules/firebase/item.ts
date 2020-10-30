import { reactive, toRefs } from '@vue/composition-api'
import ItemModel from '@/models/firebase/ItemModel'
import { StateChanger, Item } from '@/types'

export default () => {
  const perPage = 20
  let cursor = 0
  let isLast = false
  const state = reactive({
    loading: false,
    isLogin: false,
    item: {} as Item,
    itemList: [] as Item[],
    identifier: 1
  })

  async function reset() {
    state.itemList = []
    cursor = 0
    isLast = false
    state.identifier++
  }

  function createQuery() {
    return {
      offset: cursor,
      limit: cursor + perPage - 1
    }
  }

  async function get(id: string) {
    if (state.loading) return
    console.log('item情報取得')
    new ItemModel().get(id).then((res: any) => {
      state.item = res.data
    })
  }

  async function getList(uid: string) {
    console.log('通知一覧取得')
    if (isLast || state.loading) return
    state.loading = true
    return new ItemModel()
      .getList(uid, createQuery())
      .then((res: any) => {
        state.itemList.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function infiniteHandler(uid: string, $state: StateChanger) {
    await getList(uid)
    if (isLast) {
      $state.complete(!state.itemList.length)
    } else {
      $state.loaded()
    }
    cursor += perPage
  }

  async function getAll(uid: string) {
    if (state.loading) return
    console.log('item情報全件取得')
    return new ItemModel().getAll(uid).then((res: any) => {
      state.itemList = res.data
    })
  }

  async function create(data: Item) {
    if (state.loading) return
    console.log('item作成')
    return new ItemModel().create(data)
  }

  async function update(data: Item) {
    if (state.loading) return
    console.log('item更新')
    return new ItemModel().update(data)
  }

  async function remove(id: string) {
    if (state.loading) return
    console.log('item削除')
    return new ItemModel().remove(id)
  }

  return {
    ...toRefs(state),
    get,
    getAll,
    create,
    update,
    remove
  }
}
