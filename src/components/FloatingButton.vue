<template lang="pug">
v-speed-dial.floating-action-button(
  v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
  template(v-slot:activator="")
    v-btn(v-model="state.fab" :color="state.color" dark="" fab="")
      v-icon(v-if="state.fab") $close
      template(v-else)
        template(v-for="(el,index) in params")
          v-icon(v-if="state.key===el.key") {{el.icon}}
  template(v-for="(el,index) in params")
    v-btn(@click="setButton(index)" fab='' dark='' small='' :color='el.color')
      v-icon {{el.icon}}
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from '@vue/composition-api'
type Props = {
  params: {
    icon: string
    key: string
    color: string
  }[]
}
export default defineComponent({
  props: {
    params: { type: Array }
  },
  setup(props: Props, ctx: SetupContext) {
    const state = reactive({
      fab: false,
      color: props.params[0].color,
      key: props.params[0].key
    })
    return {
      state,
      setButton(index: number) {
        ctx.emit('selected', index)
        state.color = props.params[index].color
        state.key = props.params[index].key
      }
    }
  }
})
</script>
<style scoped lang="sass">
.floating-action-button
  margin-bottom: 64px
</style>
