import { reactive, toRefs } from '@vue/composition-api'
import LogModel from '@/models/firebase/LogModel'
import { StateChanger, Log } from '@/types'

export default () => {
  const state = reactive({
    loading: false,
    log: {} as Log,
    logList: [] as Log[]
  })

  async function reset() {
    state.logList = []
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

  async function getList(
    uid: string,
    query: { startDate: Date; endDate: Date }
  ) {
    if (state.loading) return
    state.loading = true
    return new LogModel()
      .getList(uid, query)
      .then((res: any) => {
        state.logList.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
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
    getAll,
    getList,
    reset
  }
}
