<template lang="pug">
  v-container
    v-card
      v-card-title {{title}}
      v-card-text {{content}}
        v-container
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
      rules: { required: (value: string) => !!value || '必須項目です' }
    })
    const hasError = computed(() => !state.code || !state.name)
    return {
      state,
      hasError,
      ok() {
        if (!hasError) {
          ctx.emit('ok')
        }
      }
    }
  }
})
</script>
