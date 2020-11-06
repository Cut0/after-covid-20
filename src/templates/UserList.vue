<template lang="pug">
  v-list
    v-list-item-group(:color="color")
      user-item(
        v-for="(el,index) in userData"
        :showRank="showRank"
        :name="el.displayName"
        :img="el.photoURL"
        :rank="index+1"
        :content="el[contentKey]"
        )
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UserItem from '@/components/listitems/UserItem.vue'
export default defineComponent({
  components: { UserItem },
  props: {
    showRank: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Array,
      default: (): [] => []
    },
    color: {
      type: String,
      default: null
    },
    contentKey: {
      type: String,
      default: 'id'
    }
  }
})
</script>
