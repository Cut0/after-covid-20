<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    loading-circle(v-if="loading")
    notification-list(
      v-else
      :notifications="notifications")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NotificationList from '@/templates/NotificationList.vue'
import NotificationComponent from '@/modules/firebase/notification'
import LoadingCircle from '@/components/LoadingCircle.vue'
export default defineComponent({
  components: { NotificationList, LoadingCircle },
  setup() {
    const notificationComponent = NotificationComponent()
    notificationComponent.getAll()
    return {
      ...notificationComponent
    }
  }
})
</script>
