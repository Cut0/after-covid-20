<template lang="pug">
  v-container
    v-card
      v-card-title {{title}}
      v-card-text {{content}}
      v-card-actions
        v-spacer
        v-btn(
          @click="ok"
          color="#68B787" text) {{buttonName}}
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    buttonName: {
      type: String,
      default: ''
    }
  },
  setup(_, ctx: SetupContext) {
    return {
      ok() {
        ctx.emit('ok')
      }
    }
  }
})
</script>
