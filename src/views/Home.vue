<template>
  <div class="home"></div>
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
