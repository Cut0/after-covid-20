<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    template(v-if="!loading")
      general-card(
        v-if="!isLogin"
        title="ログインしませんか？" 
        content="ログインすることで全てのサービスを利用することができます。一緒にヘルスケアを頑張りましょう！！"
        buttonName="ログインページへ"
        @ok="toConfig")
      register-card(
        v-if="isLogin&&!currentUser.isComplated"
        title="クッションを登録" 
        content="これから一緒に働くパートナーです。しっかりと名前をつけてあげましょう"
        buttonName="登録"
        @ok="registerPet")
      template(v-if="isLogin&&currentUser.isComplated")
        v-tabs-items(v-model="tabs.homeTab")
          v-tab-item(key="0")
            character-tab(
              :user="currentUser"
              :workingTime="state.workingTime"
              :showTime="true")
          v-tab-item(key="1")
            v-container.pl-3
              v-row.pl-3.my-2(align="center")
                v-icon {{state.chartType.icon}}
                span.title.ml-1 {{state.chartType.title}}の変動
              loading-circle(v-if="loading")
              template(v-else)
                transition(
                  :chartData="monthlyChartLog"
                  :options="chart.options")
    floating-button(
      v-if="tabs.homeTab===1"
      :params="chart.types"
      @selected="setChartType")
</template>
<script lang="ts">
import {
  reactive,
  defineComponent,
  SetupContext,
  watch
} from '@vue/composition-api'
import UserComponent from '@/modules/firebase/user'
import LogComponent from '@/modules/firebase/log'
import GeneralCard from '@/components/cards/GeneralCard.vue'
import RegisterCard from '@/components/cards/RegisterCard.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import Transition from '@/components/graphs/SingleTransition.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import CharacterTab from '@/templates/CharacterTab.vue'
import { DateTips, ToolTips } from '@/mixins'

type Props = {
  tabs: { homeTab: number; rankingTab: number }
}

type ChartType = {
  title: string
  key: string
  color: string
  label: string
}

export default defineComponent({
  components: {
    GeneralCard,
    RegisterCard,
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
      types: [
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
      fab: false,
      workingTime: '0:00:00',
      chartType: chart.types[0]
    })

    async function setChartData() {
      logComponent.reset()
      const uid = userComponent.currentUser.value.id
      const startDate = DateTips.FirstDateInYear
      const endDate = DateTips.LastDateInYear
      await logComponent.getList(uid, {
        startDate,
        endDate
      })
      logComponent.formatForChart(uid, state.chartType)
    }

    function setTimer() {
      setInterval(() => {
        if (!userComponent.currentUser.value.lastSitDate) return
        const diff = DateTips.dateDiff(
          new Date(),
          userComponent.currentUser.value.lastSitDate
        )
        state.workingTime = DateTips.toTimeStr(diff)
      }, 1000)
    }

    watch(
      userComponent.isLogin,
      val => {
        if (val) {
          setChartData()
          setTimer()
        }
      },
      { immediate: true }
    )

    watch(
      () => props.tabs.homeTab,
      async val => {
        if (val === 1) setChartData()
      }
    )

    return {
      state,
      chart,
      ...userComponent,
      ...logComponent,
      toConfig() {
        ToolTips.navigateTo(ctx, '/config')
      },
      registerPet({ name }: { name: string }) {
        const currentUser = userComponent.currentUser.value
        currentUser.petName = name
        currentUser.isComplated = true
        userComponent.update(currentUser)
      },
      setChartType(index: number) {
        state.chartType = chart.types[index]
        chart.options.scales.yAxes[0].scaleLabel.labelString =
          chart.types[index].label
        setChartData()
      }
    }
  }
})
</script>
