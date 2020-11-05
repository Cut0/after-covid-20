<template lang="pug">
  v-app(color="#49337D")
    navigation-drawer
    application-bar(@rankingTab="setRankingTab")
    v-main
      router-view(:ranking-tab="state.rankingTab")
    navigation-bar
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from '@vue/composition-api'
import ApplicationBar from '@/components/ApplicationBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
export default defineComponent({
  components: { ApplicationBar, NavigationBar, NavigationDrawer },
  setup() {
    const state = reactive({ rankingTab: 0 })
    return {
      state,
      setRankingTab(value: number) {
        state.rankingTab = value
      }
    }
  }
})
</script>
