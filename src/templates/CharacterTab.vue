<template lang="pug">
div
  v-row.my-6.mx-2(align="center")
    v-progress-circular(
        :rotate="-90"
        :size="70"
        :width="8"
        :value="(user.point%200)/2"
        color="#68B787") {{user.level}}
    span.headline.ml-4 {{user.petName}}
  character(
    :photoURL="user.petPhotoURL"
    :isWorking="user.isWorking")
  v-row.my-6.mx-0(justify="center" align-content="center")
    v-container
      v-btn.px-2.title(
        v-if="user.isWorking"
        x-large
        color="#ff7f50"
        rounded
        block
        dark
        @click="finishWork") {{workingTime}}
      v-btn.px-2.title(
        v-else
        x-large
        color="#68B787"
        rounded
        block
        dark
        @click="startWork") 休憩中
</template>
<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import Character from '@/components/canvas/Character.vue'
export default defineComponent({
  components: {
    Character
  },
  props: {
    user: { type: Object },
    workingTime: { type: String }
  },
  setup(_, ctx: SetupContext) {
    return {
      startWork() {
        ctx.emit('startWork')
      },
      finishWork() {
        ctx.emit('finishWork')
      }
    }
  }
})
</script>
