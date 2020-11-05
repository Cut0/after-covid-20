<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    v-tabs-items(v-model="rankingTab")
      v-tab-item(
          v-for="(el,index) in [0,1,2,3]"
          :key="index") 
              user-list(
                :showRank="true"
                :userData="users"
                :contentKey="state.contentKey"
                color="#68B787")
    v-speed-dial.floating-action-button(
      v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
        template(v-slot:activator="")
          v-btn(v-model="state.fab" :color="state.sortType.color" dark="" fab="")
            v-icon(v-if="state.fab") $close
            template(v-else)
              v-icon(v-if="state.sortType.name==='point'") $point
              v-icon(v-if="state.sortType.name==='time'") $working
        v-btn(@click="setSortType('point')" fab='' dark='' small='' color='#ff7f50')
          v-icon $point
        v-btn(@click="setSortType('time')" fab='' dark='' small='' color='#4682b4')
          v-icon $working
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
    const fields: {
      [key: string]: {
        name: string
        color: string
      }
    }[] = [
      {
        time: { name: 'dailyTime', color: '#4682b4' },
        point: { name: 'dailyPoint', color: '#ff7f50' }
      },
      {
        time: { name: 'weeklyTime', color: '#4682b4' },
        point: { name: 'weeklyPoint', color: '#ff7f50' }
      },
      {
        time: { name: 'monthlyTime', color: '#4682b4' },
        point: { name: 'monthlyPoint', color: '#ff7f50' }
      },
      {
        time: { name: 'time', color: '#4682b4' },
        point: { name: 'point', color: '#ff7f50' }
      }
    ]
    const state = reactive({
      contentKey: fields[0].point.name,
      sortType: { name: 'point', color: '#ff7f50' },
      fav: false
    })
    const userComponent = UserComponent()
    watch(
      () => props.rankingTab,
      value => {
        userComponent.reset()
        const sortKey = fields[value][state.sortType.name].name
        state.contentKey = sortKey
        userComponent.getAll(sortKey)
      },
      { immediate: true }
    )
    watch(
      () => state.sortType,
      value => {
        userComponent.reset()
        const sortKey = fields[props.rankingTab][value.name].name
        state.contentKey = sortKey
        userComponent.getAll(sortKey)
      }
    )
    return {
      state,
      ...userComponent,
      setSortType(name: string) {
        state.sortType = { name, color: fields[props.rankingTab][name].color }
      }
    }
  }
})
</script>
<style scoped lang="sass">
.floating-action-button
  margin-bottom: 64px
.tes
  display: flex
  align-items: center
  > span
    writing-mode: horizontal-tb !important
</style>
