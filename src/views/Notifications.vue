<template lang="pug">
  .notifications
    notification-list(:notifications="notifications")
</template>

<script lang="ts">
import { reactive, SetupContext, defineComponent } from '@vue/composition-api'
import NotificationList from '@/templates/NotificationList.vue'
import NotificationComponent from '@/modules/firebase/notification'
export default defineComponent({
  components: { NotificationList },
  setup(_, ctx) {
    const notificationComponent = NotificationComponent()
    notificationComponent.getAll()
    return {
      ...notificationComponent
    }
  }
})
</script>
