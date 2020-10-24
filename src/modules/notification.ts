import { reactive, toRefs } from '@vue/composition-api'

export default () => {
  const state = reactive({
    loading: false
  })

  async function getList() {
    console.log('通知一覧取得')
  }

  return {
    ...toRefs(state),
    getList
  }
}
