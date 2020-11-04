import { reactive, toRefs } from '@vue/composition-api'
import LogModel from '@/models/firebase/LogModel'
import { StateChanger, Log } from '@/types'

export default () => {
  const perPage = 20
  let cursor = 0
  let isLast = false
  const state = reactive({
    loading: false,
    isLogin: false,
    log: {} as Log,
    logList: [] as Log[],
    identifier: 1
  })

  async function reset() {
    state.logList = []
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
    state.loading = true
    return new LogModel()
      .get(id)
      .then((res: any) => {
        state.log = res.data
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function getList(uid: string) {
    if (isLast || state.loading) return
    state.loading = true
    return new LogModel()
      .getList(uid, createQuery())
      .then((res: any) => {
        state.logList.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function infiniteHandler(uid: string, $state: StateChanger) {
    await getList(uid)
    if (isLast) {
      $state.complete(!state.logList.length)
    } else {
      $state.loaded()
    }
    cursor += perPage
  }

  async function getAll(uid: string) {
    if (state.loading) return
    state.loading = true
    return new LogModel()
      .getAll(uid)
      .then((res: any) => {
        state.logList = res.data
      })
      .finally(() => {
        state.loading = false
      })
  }

  return {
    ...toRefs(state),
    get,
    getAll
  }
}
