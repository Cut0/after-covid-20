<template lang="pug">
    v-list-item(
      @click="clicked" 
      max-width="598")
      v-list-item-icon(v-if="showRank")
        v-list-item-title.mx-4 {{rank}}
        v-avatar(size="48").mx-4
          v-img(:src="img" alt="ユーザープロフィール" loading="lazy")
      v-list-item-content
        v-list-item-title {{name}}
      v-list-item-action.mx-4(v-if="isTime")
        span {{convertTime(content)}}
      v-list-item-action.mx-4(v-else)
        span {{content}}
</template>

<script lang="ts">
import { DateTips } from '@/mixins'
import { SetupContext, defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
  props: {
    showRank: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    rank: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    img: {
      type: String
    },
    content: {
      default: ''
    },
    isTime: {
      type: Boolean
    }
  },
  setup(props, context: SetupContext) {
    return {
      convertTime(time: number) {
        return DateTips.toTimeMinuteStr(time)
      },
      clicked() {
        context.emit('clicked', props.id)
      }
    }
  }
})
</script>

<style scoped lang="sass">
.img-wrapper
  width: 40px
  height: 40px
  position: relative
.img-wrapper > img
  position: absolute
  top: 50%
  left: 50%
  width: 40px
  height: 40px
  object-fit: cover
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  border-radius: 50%
  background-color: grey
</style>
