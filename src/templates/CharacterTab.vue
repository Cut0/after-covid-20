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
    span.display-3(v-if="user.isWorking&&showTime") {{workingTime}}
    span.display-3(v-else) 休憩中
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Character from '@/components/canvas/Character.vue'
export default defineComponent({
  components: {
    Character
  },
  props: {
    user: { type: Object },
    workingTime: { type: String },
    showTime: { type: Boolean, default: false }
  }
})
</script>
