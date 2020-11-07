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
                v-icon(v-if="state.graphType.key==='point'") $point
                v-icon(v-if="state.graphType.key==='time'") $working
                span.title.ml-1 {{state.graphType.title}}の変動
              transition(:chartData="state.logs")
    v-speed-dial.floating-action-button(
      v-if="homeTab===1"
      v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
        template(v-slot:activator="")
          v-btn(v-model="state.fab" :color="state.graphType.color" dark="" fab="")
            v-icon(v-if="state.fab") $close
            template(v-else)
              v-icon(v-if="state.graphType.key==='point'") $point
              v-icon(v-if="state.graphType.key==='time'") $working
        v-btn(@click="setGraphType({title:'経験値',key:'point',color:'#ff7f50'})" fab='' dark='' small='' color='#ff7f50')
          v-icon $point
        v-btn(@click="setGraphType({title:'労働時間',key:'time',color:'#4682b4'})" fab='' dark='' small='' color='#4682b4')
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
import { Tooltip } from 'chart.js'

type Props = {
  homeTab: number
}

type GraphType = {
  title: string
  key: string
  color: string
}

async function formatLogs(uid: string, graphType: GraphType) {
  const labels: string[] = []
  const datasets = [
    {
      label: graphType.title,
      lineTension: 0,
      borderColor: graphType.color,
      data: [] as string[]
    }
  ]
  DateTips.repeatMonth(new Date(), (date: Date) => {
    datasets[0].data.push('0')
    labels.push(DateTips.toStr(date))
  })

  const logComponent = LogComponent()
  logComponent.reset()
  const startDate = DateTips.FirstDateInYear
  const endDate = DateTips.LastDateInYear
  await logComponent.getList(uid, { startDate, endDate }).then(() => {
    switch (graphType.key) {
      case 'point':
        logComponent.logList.value.map(el => {
          datasets[0].data[el.date.getDate() - 1] = (
            el.point + Number(datasets[0].data[el.date.getDate() - 1])
          ).toString()
        })
        break
      case 'time':
        logComponent.logList.value.map(el => {
          datasets[0].data[el.date.getDate() - 1] = (
            el.time + Number(datasets[0].data[el.date.getDate() - 1])
          ).toString()
        })
        break
      case 'level':
        logComponent.logList.value.map(el => {
          datasets[0].data[el.date.getDate() - 1] = el.level.toString()
        })
        break
    }
  })
  return { labels, datasets }
}

export default defineComponent({
  components: { GeneralCard, RegisterCard, Transition },
  props: {
    homeTab: { type: Number }
  },
  setup(props: Props, ctx: SetupContext) {
    const state = reactive({
      fab: false,
      graphType: { title: '経験値', key: 'point', color: '#ff7f50' },
      logs: {}
    })
    const userComponent = UserComponent()
    watch(userComponent.isLogin, async val => {
      if (val) {
        formatLogs(userComponent.currentUser.value.id, state.graphType).then(
          res => (state.logs = res)
        )
      }
    })
    watch(
      () => props.homeTab,
      val => {
        if (val === 1) {
          formatLogs(userComponent.currentUser.value.id, state.graphType).then(
            res => (state.logs = res)
          )
        }
      }
    )
    watch(
      () => state.graphType,
      () => {
        formatLogs(userComponent.currentUser.value.id, state.graphType).then(
          res => (state.logs = res)
        )
      }
    )
    return {
      state,
      ...userComponent,
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
      setGraphType(data: GraphType) {
        state.graphType = data
      }
    }
  }
})
</script>
<style scoped lang="sass">
.floating-action-button
  margin-bottom: 64px
</style>
