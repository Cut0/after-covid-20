<template lang="pug">
    v-list-item(max-width="598")     
      v-list-item-content
        .notification-icons
          span.icon-wrapper.mr-4
            v-icon $notification
          span.icon-wrapper.mr-4
            img(src="https://picsum.photos/200/300" alt="" loading="lazy")
        .notification-body
          v-list-item-title.notification-title {{title}}
          v-list-item-subtitle.notification-content {{content.replaceAll('\\n', '\n')}}
</template>
<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'
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
  }
})
</script>

<style scoped lang="sass">
.notification-icons
  display: flex
  justify-content: flex-start
.notification-body
  margin-left: 56px
.notification-body > .notification-title
  margin: 8px 0px
.notification-content
  white-space: pre-line
.icon-wrapper
  width: 40px
  height: 40px
  position: relative
.icon-wrapper > img
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
.icon-wrapper > span
  position: absolute
  top: 50%
  left: 50%
  width: 40px
  height: 40px
  object-fit: cover
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
</style>
