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
      v-speed-dial.floating-action-button(v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
        template(v-slot:activator='')
          v-btn(v-model='state.fab' color="#2e8b57" dark='' fab='')
            v-icon(v-if='state.fab') $close
            v-icon(v-else='') $account
        v-btn(fab='' dark='' small='' color='#f0e68c' @click="$refs.itemAdder.open()")
          v-icon $plus
        v-btn(fab='' dark='' small='' color='#4682b4')
          v-icon $edit
        v-btn(fab='' dark='' small='' color='#ff7f50')
          v-icon $delete
</template>
<script lang="ts">
import { reactive, defineComponent, SetupContext } from '@vue/composition-api'
import UserComponent from '@/modules/firebase/user'
import GeneralCard from '@/components/cards/GeneralCard.vue'
import RegisterCard from '@/components/cards/RegisterCard.vue'
import { Tips } from '@/mixins'
export default defineComponent({
  components: { GeneralCard, RegisterCard },
  setup(_, ctx: SetupContext) {
    const userComponent = UserComponent()
    const state = reactive({
      fab: false
    })
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
