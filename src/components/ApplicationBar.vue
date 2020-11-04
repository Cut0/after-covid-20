<template lang="pug">
  v-app-bar(color="#68B787" app fixed collapse-on-scroll dark)
    v-app-bar-nav-icon(aria-label="ページアイコン")
      v-icon(v-if="$route.name==='ホーム'") $home
      v-icon(v-if="$route.name==='検索'") $search
      v-icon(v-if="$route.name==='ランキング'") $crown
      v-icon(v-if="$route.name==='通知一覧'") $notification
      v-icon(v-if="$route.name==='設定'") $config
    v-toolbar-title {{this.$route.name}}
    v-spacer
    v-avatar(size="36")
      template(v-if="isLogin")
        v-img(:src="currentUser.photoURL")
      template(v-else)
        v-icon $account
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UserComponent from '@/modules/firebase/user'
export default defineComponent({
  setup() {
    const userComponent = UserComponent()
    return {
      ...userComponent
    }
  }
})
</script>
