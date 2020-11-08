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
      template(v-if="isLogin")
        v-tabs-items(v-model="tabs.homeTab")
          v-tab-item(key="0")
            v-row.my-6.mx-2(align="center")
              v-progress-circular(
                  :rotate="-90"
                  :size="70"
                  :width="8"
                  :value="currentUser.point%100"
                  color="#68B787") {{currentUser.level}}
              span.headline.ml-4 {{currentUser.petName}}
            character(
              :photoURL="currentUser.petPhotoURL"
              :isWorking="currentUser.isWorking"
            )
            v-row.my-6.mx-0(justify="center" align-content="center")
              span.display-3(v-if="currentUser.isWorking") {{state.workingTime}}
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
                transition(:chartData="monthlyChartLog")
    v-speed-dial.floating-action-button(
      v-if="tabs.homeTab===1"
      v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
        template(v-slot:activator="")
          v-btn(v-model="state.fab" :color="state.chartType.color" dark="" fab="")
            v-icon(v-if="state.fab") $close
            template(v-else)
              v-icon(v-if="state.chartType.key==='point'") $point
              v-icon(v-if="state.chartType.key==='time'") $working
              v-icon(v-if="state.chartType.key==='level'") $level
        v-btn(@click="setChartType({title:'経験値',key:'point',color:'#ff7f50'})" fab='' dark='' small='' color='#ff7f50')
          v-icon $point
        v-btn(@click="setChartType({title:'労働時間',key:'time',color:'#4682b4'})" fab='' dark='' small='' color='#4682b4')
          v-icon $working
        v-btn(@click="setChartType({title:'レベル',key:'level',color:'#2e8b57'})" fab='' dark='' small='' color='#2e8b57')
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
import GeneralCard from '@/components/cards/GeneralCard.vue'
import RegisterCard from '@/components/cards/RegisterCard.vue'
import Transition from '@/components/graphs/SingleTransition.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import Character from '@/components/canvas/Character.vue'
import { DateTips, ToolTips } from '@/mixins'

type Props = {
  tabs: { homeTab: number; rankingTab: number }
}

type ChartType = {
  title: string
  key: string
  color: string
}

export default defineComponent({
  components: {
    GeneralCard,
    RegisterCard,
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
      chartType: { title: '経験値', key: 'point', color: '#ff7f50' },
      logs: {}
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
        if (!userComponent.currentUser.value.date) return
        const diff = DateTips.dateDiff(
          new Date(),
          userComponent.currentUser.value.date
        )
        state.workingTime = DateTips.toTimeStr(diff)
      }, 1000)
    }

    watch(userComponent.isLogin, async val => {
      if (val) {
        setChartData()
        setTimer()
      }
    })
    if (userComponent.isLogin) {
      setTimer()
      watch(
        () => props.tabs.homeTab,
        async val => {
          if (val === 1) setChartData()
        }
      )
      watch(
        () => state.chartType,
        async () => setChartData()
      )
    }

    return {
      state,
      ...userComponent,
      ...logComponent,
      toConfig() {
        ToolTips.navigateTo(ctx, '/config')
      },
      registerPet({ name, code }: { name: string; code: string }) {
        const currentUser = userComponent.currentUser.value
        currentUser.petName = name
        currentUser.petCode = code
        currentUser.isComplated = true
        userComponent.update(currentUser)
      },
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
