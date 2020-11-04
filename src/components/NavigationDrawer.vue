<template lang="pug">
  v-navigation-drawer(
    v-if="!$vuetify.breakpoint.xs"
    color="#68B787" app fixed permanent touchless dark)
    v-list
      v-list-item(@click="to('/Config')")
        v-list-item-avatar
          template(v-if="isLogin")
            v-img(:src="currentUser.photoURL")
          template(v-else)
            v-icon $account
        v-list-item-content
          template(v-if="isLogin")
            v-list-item-title {{currentUser.displayName}}
            v-list-item-subtitle {{currentUser.uid}}
          template(v-else)
            v-list-item-title ログインしましょう
      v-divider
      v-list-item-group(aria-label="ページ遷移用")
        v-list-item(@click="to('/home')" role="option")
          v-list-item-icon
            v-icon  $home
          v-list-item-content
            v-list-item-title ホーム
        v-list-item(@click="to('/search')" role="option")
          v-list-item-icon
            v-icon  $search
          v-list-item-content
            v-list-item-title 検索
        v-list-item(@click="to('/ranking')" role="option")
          v-list-item-icon
            v-icon  $crown
          v-list-item-content
            v-list-item-title ランキング
        v-list-item(@click="to('/notifications')" role="option")
          v-list-item-icon
            v-icon  $notification
          v-list-item-content
            v-list-item-title お知らせ
        v-list-item(@click="to('/config')" role="option")
          v-list-item-icon
            v-icon  $config
          v-list-item-content
            v-list-item-title 設定
</template>
<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'
import UserComponent from '@/modules/firebase/user'
import { Tips } from '@/mixins'
export default defineComponent({
  setup(_, ctx: SetupContext) {
    const userComponent = UserComponent()
    return {
      ...userComponent,
      to(path: string) {
        Tips.navigateTo(ctx, path)
      }
    }
  }
})
</script>
