<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    template(v-if="!loading")
      template(v-if="user")
        v-tabs-items(v-model="tabs.userTab")
          template
            v-tab-item(key="0")
              character-tab(:user="user")
            v-tab-item(key="1")
              v-container.pl-3
                v-row.pl-3.my-2(align="center")
                  v-icon {{state.chartParams.icon}}
                  span.title.ml-1 {{state.chartParams.title}}の変動
                loading-circle(v-if="loading")
                template(v-else)
                  transition(
                    :chartData="monthlyChartLog"
                    :options="chart.options")
      template(v-else)
        v-row(justify="center" no-gutters)  
          span.ma-4 データが存在しません
    floating-button(
      v-if="tabs.userTab===1"
      :params="chart.table"
      @selected="setChartParams")
</template>
<script lang="ts">
import { reactive, defineComponent, SetupContext } from '@vue/composition-api'
import UserComponent from '@/modules/firebase/user'
import LogComponent from '@/modules/firebase/log'
import FloatingButton from '@/components/FloatingButton.vue'
import Transition from '@/components/graphs/SingleTransition.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import CharacterTab from '@/templates/CharacterTab.vue'
import { DateTips } from '@/mixins'

type Props = {
  tabs: { userTab: number; rankingTab: number }
}

export default defineComponent({
  components: {
    Transition,
    LoadingCircle,
    CharacterTab,
    FloatingButton
  },
  props: {
    tabs: {}
  },
  setup(props: Props, ctx: SetupContext) {
    const userComponent = UserComponent()
    const logComponent = LogComponent()
    const chart = reactive({
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: '経験値(ポイント)',
                fontSize: 12
              }
            }
          ]
        },
        layout: {
          padding: {
            left: 0,
            right: 24,
            top: 0,
            bottom: 0
          }
        }
      },
      table: [
        {
          title: '経験値',
          label: '経験値(ポイント)',
          color: '#ff7f50',
          key: 'point',
          icon: '$point'
        },
        {
          title: '労働時間',
          label: '労働時間(分)',
          color: '#4682b4',
          key: 'time',
          icon: '$working'
        },
        {
          title: 'レベル',
          label: 'レベル(Lv)',
          color: '#2e8b57',
          key: 'level',
          icon: '$level'
        }
      ]
    })

    const state = reactive({
      workingTime: '0:00:00',
      chartParams: chart.table[0]
    })

    const uid = ctx.root.$route.params.id as string

    async function setChartData() {
      logComponent.reset()
      const startDate = DateTips.FirstDateInYear
      const endDate = DateTips.LastDateInYear
      await logComponent.getList(uid, {
        startDate,
        endDate
      })
      logComponent.formatForChart(uid, state.chartParams)
    }

    userComponent.get(uid).then(() => {
      if (userComponent.user.value.id) {
        setInterval(() => {
          const diff = DateTips.dateDiff(
            new Date(),
            userComponent.user.value.lastSitDate
          )
          state.workingTime = DateTips.toTimeStr(diff)
        }, 1000)
        setChartData()
      }
    })

    return {
      state,
      chart,
      ...userComponent,
      ...logComponent,
      setChartParams(index: number) {
        state.chartParams = chart.table[index]
        chart.options.scales.yAxes[0].scaleLabel.labelString =
          chart.table[index].label
        setChartData()
      }
    }
  }
})
</script>
