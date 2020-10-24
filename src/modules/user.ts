import { reactive, toRefs } from '@vue/composition-api'

export default () => {
  const state = reactive({
    loading: false,
    isLogin: false
  })

  async function get() {
    console.log('user情報取得')
  }
  async function create() {
    console.log('user作成')
  }

  return {
    ...toRefs(state),
    get,
    create
  }
}
