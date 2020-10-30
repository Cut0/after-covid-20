<template lang="pug">
  v-navigation-drawer(
    v-if="!$vuetify.breakpoint.xs"
    color="#68B787" app fixed permanent touchless dark)
    v-list
      v-list-item(@click="navigateTo('/Config')")
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
import UserComponent from '@/modules/firebase/user'
export default defineComponent({
  setup(_, context: SetupContext) {
    const userComponent = UserComponent()
    return {
      ...userComponent,
      navigateTo(path: string) {
        if (path !== context.root.$route.path) context.root.$router.push(path)
      }
    }
  }
})
</script>
