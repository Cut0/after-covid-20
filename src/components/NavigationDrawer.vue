<template lang="pug">
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
        v-list-item(@click="navigateTo('/search')" role="option")
          v-list-item-icon
            v-icon  $search
          v-list-item-content
            v-list-item-title 検索
        v-list-item(@click="navigateTo('/notifications')" role="option")
          v-list-item-icon
            v-icon  $notification
          v-list-item-content
            v-list-item-title お知らせ
        v-list-item(@click="navigateTo('/config')" role="option")
          v-list-item-icon
            v-icon  $config
          v-list-item-content
            v-list-item-title 設定
</template>
<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_, context: SetupContext) {
    return {
      navigateTo(path: string) {
        if (path !== context.root.$route.path) context.root.$router.push(path)
      }
    }
  }
})
</script>
