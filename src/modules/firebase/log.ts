import { reactive, toRefs } from '@vue/composition-api'
import LogModel from '@/models/firebase/LogModel'
import { DateTips } from '@/mixins'
import { Log } from '@/types'

export default () => {
  const state = reactive({
    loading: false,
    log: {} as Log,
    logList: [] as Log[],
    monthlyChartLog: {}
  })

  async function reset() {
    state.log = {} as Log
    state.logList = [] as Log[]
    state.monthlyChartLog = {}
  }

  async function getList(
    uid: string,
    query: { startDate: Date; endDate: Date }
  ) {
    if (state.loading) return
    state.loading = true
    return await new LogModel()
      .getList(uid, query)
      .then((res: any) => {
        state.logList.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function remove(id: string) {
    return await new LogModel().remove(id)
  }

  type ChartType = {
    title: string
    key: string
    color: string
  }

  function formatForChart(uid: string, chartType: ChartType) {
    const labels: string[] = []
    const datasets = [
      {
        label: chartType.title,
        lineTension: 0,
        borderColor: chartType.color,
        data: [] as string[]
      }
    ]
    DateTips.repeatMonth(new Date(), (date: Date) => {
      datasets[0].data.push('0')
      labels.push(DateTips.toStr(date))
    })

    switch (chartType.key) {
      case 'point':
        state.logList.map(el => {
          datasets[0].data[el.date.getDate() - 1] = (
            el.point + Number(datasets[0].data[el.date.getDate() - 1])
          ).toString()
        })
        break
      case 'time':
        state.logList.map(el => {
          datasets[0].data[el.date.getDate() - 1] = (
            el.time + Number(datasets[0].data[el.date.getDate() - 1])
          ).toString()
        })
        break
      case 'level':
        state.logList.map(el => {
          datasets[0].data[el.date.getDate() - 1] = el.level.toString()
        })
        break
    }
    state.monthlyChartLog = { labels, datasets }
  }

  return {
    ...toRefs(state),
    getList,
    reset,
    remove,
    formatForChart
  }
}
