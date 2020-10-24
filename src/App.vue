<template lang="pug">
  v-app(color="#49337D")
    navigation-drawer
    application-bar
    v-main
      router-view
    navigation-bar
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from '@vue/composition-api'
import ApplicationBar from '@/components/ApplicationBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
export default defineComponent({
  components: { ApplicationBar, NavigationBar, NavigationDrawer }
})
</script>
