<template lang="pug"> 
    v-container.px-1.pl-3
      v-card
        v-card-title {{title}}
        v-card-text {{content}}
          v-container
            v-row
              v-col
                v-text-field(
                  v-model="state.name"
                  label="キャラクターの名前"
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
      name: null,
      rules: { required: (value: string) => !!value || '必須項目です' }
    })
    const hasError = computed(() => !state.name)
    return {
      state,
      hasError,
      ok() {
        if (!hasError.value) {
          ctx.emit('ok', { name: state.name })
        }
      }
    }
  }
})
</script>
