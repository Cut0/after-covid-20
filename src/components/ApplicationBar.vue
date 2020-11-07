<template lang="pug">
  v-app-bar(color="#68B787" app fixed dark)
    v-app-bar-nav-icon(aria-label="ページアイコン")
      v-icon(v-if="$route.name==='ホーム'") $home
      v-icon(v-if="$route.name==='トップ100'") $crown
      v-icon(v-if="$route.name==='通知一覧'") $notification
      v-icon(v-if="$route.name==='設定'") $config
    v-toolbar-title {{this.$route.name}}
    v-spacer
    v-avatar(size="36")
      template(v-if="isLogin")
        v-img(:src="currentUser.photoURL")
      template(v-else)
        v-icon $account
    template(
        v-if="($route.name==='トップ100')||($route.name==='ホーム'&&isLogin&&currentUser.isComplated)"
        v-slot:extension)
        v-tabs(
          v-if="$route.name==='ホーム'&&isLogin&&currentUser.isComplated"
          v-model="homeTab"
          fixed-tabs centered)
          v-tab(key="0") クッション
          v-tab(key="1") グラフ
        v-tabs(
          v-if="$route.name==='トップ100'"
          v-model="rankingTab"
          fixed-tabs centered)
          v-tab(key="0") 本日
          v-tab(key="1") 週間
          v-tab(key="2") 月間
          v-tab(key="3") 累計
</template>
<script lang="ts">
import { defineComponent, watch, ref, SetupContext } from '@vue/composition-api'
import UserComponent from '@/modules/firebase/user'
export default defineComponent({
  setup(_, ctx: SetupContext) {
    const homeTab = ref({})
    watch(homeTab, value => {
      ctx.emit('homeTab', value)
    })
    const rankingTab = ref({})
    watch(rankingTab, value => {
      ctx.emit('rankingTab', value)
    })
    watch(
      () => ctx.root.$route,
      () => {
        homeTab.value = 0
        rankingTab.value = 0
      }
    )
    const userComponent = UserComponent()
    return {
      homeTab,
      rankingTab,
      ...userComponent
    }
  }
})
</script>
