import { reactive, toRefs } from '@vue/composition-api'

export default () => {
  const state = reactive({
    loading: false
  })

  async function getList() {
    console.log('Spot一覧取得')
  }

  async function matchedSpotList(name: string) {
    console.log('Nameが一致するSpot取得')
  }

  return {
    ...toRefs(state),
    getList,
    matchedSpotList
  }
}
