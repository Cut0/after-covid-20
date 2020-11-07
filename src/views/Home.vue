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
        v-tabs-items(v-model="homeTab")
          v-tab-item(key="0")
          v-tab-item(key="1")
            v-container.pl-3
              v-row.pl-3.my-2(align="center")
                v-icon(v-if="state.chartType.key==='point'") $point
                v-icon(v-if="state.chartType.key==='time'") $working
                span.title.ml-1 {{state.chartType.title}}の変動
              transition(:chartData="monthlyChartLog")
    v-speed-dial.floating-action-button(
      v-if="homeTab===1"
      v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
        template(v-slot:activator="")
          v-btn(v-model="state.fab" :color="state.chartType.color" dark="" fab="")
            v-icon(v-if="state.fab") $close
            template(v-else)
              v-icon(v-if="state.chartType.key==='point'") $point
              v-icon(v-if="state.chartType.key==='time'") $working
        v-btn(@click="setchartType({title:'経験値',key:'point',color:'#ff7f50'})" fab='' dark='' small='' color='#ff7f50')
          v-icon $point
        v-btn(@click="setchartType({title:'労働時間',key:'time',color:'#4682b4'})" fab='' dark='' small='' color='#4682b4')
          v-icon $working
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
import { DateTips, ToolTips } from '@/mixins'

type Props = {
  homeTab: number
}

type ChartType = {
  title: string
  key: string
  color: string
}

export default defineComponent({
  components: { GeneralCard, RegisterCard, Transition },
  props: {
    homeTab: { type: Number }
  },
  setup(props: Props, ctx: SetupContext) {
    const state = reactive({
      fab: false,
      chartType: { title: '経験値', key: 'point', color: '#ff7f50' },
      logs: {}
    })
    const userComponent = UserComponent()
    const logComponent = LogComponent()

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

    watch(userComponent.isLogin, async val => {
      if (val) setChartData()
    })
    watch(
      () => props.homeTab,
      async val => {
        if (val === 1) setChartData()
      }
    )
    watch(
      () => state.chartType,
      async () => setChartData()
    )

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
      setchartType(data: ChartType) {
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
