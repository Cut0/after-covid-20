<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    template(v-if="!loading")
      template(v-if="user")
        v-tabs-items(v-model="tabs.userTab")
          template
            v-tab-item(key="0")
              v-row.my-6.mx-2(align="center")
                v-progress-circular(
                    :rotate="-90"
                    :size="70"
                    :width="8"
                    :value="(user.point%200)/2"
                    color="#68B787") {{user.level}}
                span.headline.ml-4 {{user.petName}}
              character(
                :photoURL="user.petPhotoURL"
                :isWorking="user.isWorking")
              v-row.my-6.mx-0(justify="center" align-content="center")
                span.display-3(v-if="user.isWorking") {{state.workingTime}}
                span.display-3(v-else) 休憩中
            v-tab-item(key="1")
              v-container.pl-3
                v-row.pl-3.my-2(align="center")
                  v-icon(v-if="state.chartType.key==='point'") $point
                  v-icon(v-if="state.chartType.key==='time'") $working
                  v-icon(v-if="state.chartType.key==='level'") $level
                  span.title.ml-1 {{state.chartType.title}}の変動
                loading-circle(v-if="loading")
                template(v-else)
                  transition(
                    :chartData="monthlyChartLog"
                    :options="state.options")
      template(v-else)
        v-row(justify="center" no-gutters)  
          span.ma-4 データが存在しません
      v-speed-dial.floating-action-button(
        v-if="user&&tabs.userTab===1"
        v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
          template(v-slot:activator="")
            v-btn(v-model="state.fab" :color="state.chartType.color" dark="" fab="")
              v-icon(v-if="state.fab") $close
              template(v-else)
                v-icon(v-if="state.chartType.key==='point'") $point
                v-icon(v-if="state.chartType.key==='time'") $working
                v-icon(v-if="state.chartType.key==='level'") $level
          v-btn(@click="setChartType({title:'経験値',key:'point',color:'#ff7f50',label:'経験値(ポイント)'})" fab='' dark='' small='' color='#ff7f50')
            v-icon $point
          v-btn(@click="setChartType({title:'労働時間',key:'time',color:'#4682b4',label:'労働時間(分)'})" fab='' dark='' small='' color='#4682b4')
            v-icon $working
          v-btn(@click="setChartType({title:'レベル',key:'level',color:'#2e8b57',label:'レベル(LV)'})" fab='' dark='' small='' color='#2e8b57')
            v-icon $level
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
import Transition from '@/components/graphs/SingleTransition.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import Character from '@/components/canvas/Character.vue'
import { DateTips } from '@/mixins'

type Props = {
  tabs: { userTab: number; rankingTab: number }
}

type ChartType = {
  title: string
  key: string
  color: string
  label: string
}

export default defineComponent({
  components: {
    Transition,
    LoadingCircle,
    Character
  },
  props: {
    tabs: {}
  },
  setup(props: Props, ctx: SetupContext) {
    const userComponent = UserComponent()
    const logComponent = LogComponent()
    const state = reactive({
      fab: false,
      workingTime: '0:00:00',
      chartType: {
        title: '経験値',
        key: 'point',
        color: '#ff7f50',
        label: '経験値(ポイント)'
      },
      logs: {},
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
      }
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
      logComponent.formatForChart(uid, state.chartType)
    }

    userComponent.get(uid).then(() => {
      watch(
        () => props.tabs.userTab,
        async val => {
          if (val === 1) setChartData()
        }
      )
      watch(
        () => state.chartType,
        async () => {
          state.options.scales.yAxes[0].scaleLabel.labelString =
            state.chartType.label
          setChartData()
        }
      )
      if (userComponent.user.value.id) {
        setInterval(() => {
          const diff = DateTips.dateDiff(
            new Date(),
            userComponent.user.value.lastSitDate
          )
          state.workingTime = DateTips.toTimeStr(diff)
        }, 1000)
      }
    })

    return {
      state,
      ...userComponent,
      ...logComponent,
      setChartType(data: ChartType) {
        state.chartType = data
      }
    }
  }
})
</script>
<style scoped lang="sass">
.floating-action-button
  margin-bottom: 64px
</style>
