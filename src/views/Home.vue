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
                v-icon $point
                span.title.ml-1 ポイントの変動
              transition(
                :params="state.logs"
                graphKey="point"
                color="#FF9800")
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
import { Tips } from '@/mixins'
import log from '@/modules/firebase/log'
type Props = {
  homeTab: number
}
type GraphLog = {
  label: string
  color: string
  date: string
  point: string
  level: string
  time: string
}

function formatLogs(uid: string) {
  const logComponent = LogComponent()
  const logs = [] as GraphLog[]
  Tips.repeatMonth(new Date(), (date: Date) => {
    logs.push({
      label: 'ログ',
      color: '#8BC34A',
      date: Tips.toStr(date),
      point: '0',
      level: '0',
      time: '0'
    })
  })
  logComponent.getAll(uid).then(() => {
    logComponent.logList.value.map(el => {
      logs[el.date.getDate() - 1].level = el.level.toString()
      logs[el.date.getDate() - 1].point = (
        el.point + Number(logs[el.date.getDate() - 1].point)
      ).toString()
      logs[el.date.getDate() - 1].time = (
        el.time + Number(logs[el.date.getDate() - 1].time)
      ).toString()
    })
  })
  return logs
}

export default defineComponent({
  components: { GeneralCard, RegisterCard, Transition },
  props: {
    homeTab: {
      type: Number
    }
  },
  setup(props: Props, ctx: SetupContext) {
    const state = reactive({
      fab: false,
      logs: [] as GraphLog[]
    })
    const userComponent = UserComponent()
    watch(userComponent.isLogin, async val => {
      if (val) state.logs = formatLogs(userComponent.currentUser.value.id)
    })
    watch(
      () => props.homeTab,
      async val => {
        if (val === 1)
          state.logs = formatLogs(userComponent.currentUser.value.id)
      }
    )

    return {
      state,
      ...userComponent,
      toConfig() {
        Tips.navigateTo(ctx, '/config')
      },
      registerPet({ name, code }: { name: string; code: string }) {
        const currentUser = userComponent.currentUser.value
        currentUser.petName = name
        currentUser.petCode = code
        currentUser.isComplated = true
        userComponent.update(currentUser)
      }
    }
  }
})
</script>
<style scoped lang="sass">
.floating-action-button
  margin-bottom: 64px
</style>
