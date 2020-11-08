<template lang="pug">
  v-list
    v-list-item-group(:color="color")
      user-item(
        v-for="(el,index) in userData"
        :showRank="showRank"
        :id="el.id"
        :name="el.petName"
        :img="el.photoURL"
        :rank="index+1"
        :content="el[contentKey]"
        @clicked="clickedItem")
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
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
  },
  setup(_, ctx: SetupContext) {
    return {
      clickedItem(id: string) {
        ctx.emit('clickedItem', id)
      }
    }
  }
})
</script>
