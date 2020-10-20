<template lang="pug">
  v-app(color="#49337D")
    v-navigation-drawer(
      v-if="!$vuetify.breakpoint.xs"
      color="#68B787" app fixed permanent touchless :expand-on-hover="$vuetify.breakpoint.xs||$vuetify.breakpoint.sm" dark)
      v-list.py-0
        v-list-item(@click="navigateTo('/')")
          v-list-item-icon
            v-icon $virus
            v-list-item-title.title コロナさいと
        v-divider
        v-list-item-group(aria-label="ページ遷移用")
          v-list-item(@click="navigateTo('/')" role="option")
            v-list-item-icon
              v-icon  $home
            v-list-item-content
              v-list-item-title ホーム
          v-list-item(@click="navigateTo('/')" role="option")
            v-list-item-icon
              v-icon  $search
            v-list-item-content
              v-list-item-title 検索
          v-list-item(@click="navigateTo('/')" role="option")
            v-list-item-icon
              v-icon  $notification
            v-list-item-content
              v-list-item-title お知らせ
          v-list-item(@click="navigateTo('/')" role="option")
            v-list-item-icon
              v-icon  $setting
            v-list-item-content
              v-list-item-title 設定
    v-app-bar(color="#68B787" app fixed collapse-on-scroll dark)
        v-app-bar-nav-icon(aria-label="ページアイコン")
          v-icon(v-if="$route.name==='Home'") $home
          v-icon(v-if="$route.name==='Search'") $search
          v-icon(v-if="$route.name==='Notification'") $notification
          v-icon(v-if="$route.name==='setting'") $setting
        v-toolbar-title {{this.$route.name}}
        v-spacer
    v-main
      v-container(color="#68B787")
        router-view(:tabs="state.tabs")
    v-bottom-navigation(
      v-if="$vuetify.breakpoint.xs"
      background-color="#68B787" app fixed grow dark)
      v-btn(to="/" aria-label="ページ")
        v-icon $home
      v-btn(to="/" aria-label="ページ")
        v-icon $search
      v-btn(to="/" aria-label="ページ")
        v-icon $notification
      v-btn(to="/" aria-label="ページ")
        v-icon $setting
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup(_, context: SetupContext) {
    const state = reactive({ tabs: { memo: null } })
    return {
      state,
      navigateTo(path: string) {
        if (path !== context.root.$route.path) context.root.$router.push(path)
      }
    }
  }
})
</script>
