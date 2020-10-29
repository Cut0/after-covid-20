<template lang="pug">
  .notifications
    loading-circle(v-if="loading")
    notification-list(
      v-else
      :notifications="notifications")
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from '@vue/composition-api'
import NotificationList from '@/templates/NotificationList.vue'
import NotificationComponent from '@/modules/firebase/notification'
import LoadingCircle from '@/components/LoadingCircle.vue'
export default defineComponent({
  components: { NotificationList, LoadingCircle },
  setup(_, ctx) {
    const notificationComponent = NotificationComponent()
    notificationComponent.getAll()
    return {
      ...notificationComponent
    }
  }
})
</script>
