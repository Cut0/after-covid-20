<template lang="pug">
  v-dialog(
    v-model="state.isOpened"
    max-width="290")
    v-card
      v-card-title {{title}}
      v-card-text {{content}}
      v-card-actions
        v-spacer
        v-btn(
          @click="cancel"
          color="#68B787" text) キャンセル
        v-btn(
          @click="ok"
          color="#68B787" text) 決定
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
    }
  },
  setup(_, context: SetupContext) {
    const state = reactive({
      isOpened: false
    })
    return {
      state,
      open() {
        state.isOpened = true
      },
      ok() {
        state.isOpened = false
        context.emit('ok')
      },
      cancel() {
        state.isOpened = false
        context.emit('cancel')
      }
    }
  }
})
</script>
