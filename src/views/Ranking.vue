<template lang="pug">
  v-container
    v-tabs-items(v-model="rankingTab")
      v-tab-item(
          v-for="(el,index) in [0,1,2]"
          :key="index")
        v-row(
          justify="center" no-gutters)  
            v-responsive(max-width="598")
              user-list(
                :showRank="true"
                :userData="users"
                :contentKey="state.contentKey"
                color="#68B787")
</template>

<script lang="ts">
import { reactive, defineComponent, watch } from '@vue/composition-api'
import LoadingCircle from '@/components/LoadingCircle.vue'
import UserList from '@/templates/UserList.vue'
import UserComponent from '@/modules/firebase/user'

type Props = {
  rankingTab: number
}

export default defineComponent({
  components: { LoadingCircle, UserList },
  props: {
    rankingTab: {
      type: Number
    }
  },
  setup(props: Props) {
    const fields = ['level', 'point', 'time']
    const state = reactive({ contentKey: fields[0] })
    const userComponent = UserComponent()
    userComponent.getAll()
    watch(
      () => props.rankingTab,
      value => {
        state.contentKey = fields[value]
      }
    )
    return {
      state,
      ...userComponent
    }
  }
})
</script>
