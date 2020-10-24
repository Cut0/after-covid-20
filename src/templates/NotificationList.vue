<template lang="pug">
.list-wrapper
  v-list
    v-list-item-group(
      :color="color")
      template(v-for="notification in notifications")
        notification-item(
          :title="notification.title"
          :content="notification.content")
        v-divider
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NotificationItem from '@/components/listitems/NotificationItem.vue'
export default defineComponent({
  components: { NotificationItem },
  props: {
    notifications: {
      type: Array,
      default: (): [] => []
    },
    color: {
      type: String,
      default: '#68B787'
    }
  }
})
</script>
