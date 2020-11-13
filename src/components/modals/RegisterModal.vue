<template lang="pug">
  v-dialog(
    v-model="state.isOpened"
    max-width="290")
    v-card
      v-card-title 
        v-icon $reset
        span.title.ml-1 {{title}}
      v-card-text 
        v-row
          v-col
            v-text-field(
              v-model="state.code"
              label="クッションの認証コード"
              persistent-hint
              color="#68B787"
              :rules="[state.rules.required]"
              required)
            v-text-field(
              v-model="state.name"
              label="クッションの名前"
              persistent-hint
              color="#68B787"
              :rules="[state.rules.required]"
              required)
      v-card-actions
        v-spacer
        v-btn(
          @click="cancel"
          color="#68B787" text) キャンセル
        v-btn(
          v-if="!hasError"
          @click="ok"
          color="#68B787" text) {{buttonName}}
</template>

<script lang="ts">
import {
  reactive,
  SetupContext,
  defineComponent,
  computed
} from '@vue/composition-api'
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
    const state = reactive({
      code: null,
      name: null,
      isOpened: false,
      rules: { required: (value: string) => !!value || '必須項目です' }
    })
    const hasError = computed(() => !state.code || !state.name)
    function reset() {
      state.code = null
      state.name = null
      state.isOpened = false
    }
    return {
      state,
      hasError,
      open() {
        state.isOpened = true
      },
      ok() {
        if (!hasError.value) {
          ctx.emit('ok', { name: state.name, code: state.code })
          reset()
        }
      },
      cancel() {
        reset()
        ctx.emit('cancel')
      }
    }
  }
})
</script>
