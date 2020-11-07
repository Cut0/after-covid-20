<template lang="pug">
  v-app(color="#49337D")
    navigation-drawer
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
            v-model="state.tabs.homeTab"
            fixed-tabs centered)
            v-tab(key="0") クッション
            v-tab(key="1") グラフ
          v-tabs(
            v-if="$route.name==='トップ100'"
            v-model="state.tabs.rankingTab"
            fixed-tabs centered)
            v-tab(key="0") 本日
            v-tab(key="1") 週間
            v-tab(key="2") 月間
            v-tab(key="3") 累計
    v-main
      router-view(
        :tabs="state.tabs")
    navigation-bar
</template>

<script lang="ts">
import {
  reactive,
  defineComponent,
  watch,
  SetupContext
} from '@vue/composition-api'
import ApplicationBar from '@/components/ApplicationBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import UserComponent from '@/modules/firebase/user'
export default defineComponent({
  components: { ApplicationBar, NavigationBar, NavigationDrawer },
  setup(_, ctx: SetupContext) {
    const userComponent = UserComponent()
    const state = reactive({
      tabs: {
        rankingTab: 0,
        homeTab: 0
      }
    })
    watch(
      () => ctx.root.$route,
      () => {
        state.tabs.homeTab = 0
        state.tabs.rankingTab = 0
      }
    )
    return {
      state,
      ...userComponent
    }
  }
})
</script>
<style lang="sass">
.v-main
  padding-bottom: 56px !important
.v-input
  max-width: 600px !important
.v-toolbar__content
  justify-content: center
</style>
