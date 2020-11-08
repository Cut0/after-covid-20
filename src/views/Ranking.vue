<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    v-tabs-items(v-model="tabs.rankingTab")
      v-tab-item(
        v-for="(el,index) in [0,1,2,3]"
        :key="index")
        v-container.pl-3.pb-0.mb-0
          v-row.pl-3.my-2(align="center")
            v-icon(v-if="state.sortType.name==='point'") $point
            v-icon(v-if="state.sortType.name==='time'") $working
            span.title.ml-1 {{state.sortType.title}}ランキング
        loading-circle(v-if="loading")
        template(v-else)
          user-list(
            :showRank="true"
            :userData="users"
            :contentKey="state.contentKey"
            color="#68B787"
            @clickedItem="toUser")
    v-speed-dial.floating-action-button(
      v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
        template(v-slot:activator="")
          v-btn(
            v-model="state.fab" 
            :color="state.sortType.color" 
            dark="" fab="")
            v-icon(v-if="state.fab") $close
            template(v-else)
              v-icon(v-if="state.sortType.name==='point'") $point
              v-icon(v-if="state.sortType.name==='time'") $working
        v-btn(@click="setSortType({title:'経験値',name:'point',color:'#ff7f50'})" 
        fab='' dark='' small='' color='#ff7f50')
          v-icon $point
        v-btn(@click="setSortType({title:'労働時間',name:'time',color:'#4682b4'})" fab='' dark='' small='' color='#4682b4')
          v-icon $working
</template>

<script lang="ts">
import {
  reactive,
  defineComponent,
  watch,
  SetupContext
} from '@vue/composition-api'
import LoadingCircle from '@/components/LoadingCircle.vue'
import UserList from '@/templates/UserList.vue'
import UserComponent from '@/modules/firebase/user'
import { ToolTips } from '@/mixins'
import _ from 'lodash'
type Props = {
  tabs: { homeTab: number; rankingTab: number }
}
type SortType = {
  title: string
  name: string
  color: string
}

export default defineComponent({
  components: { LoadingCircle, UserList },
  props: {
    tabs: {}
  },
  setup(props: Props, ctx: SetupContext) {
    const userComponent = UserComponent()
    const fields: {
      [key: string]: {
        key: string
      }
    }[] = [
      {
        time: { key: 'dailyTime' },
        point: { key: 'dailyPoint' }
      },
      {
        time: { key: 'weeklyTime' },
        point: { key: 'weeklyPoint' }
      },
      {
        time: { key: 'monthlyTime' },
        point: { key: 'monthlyPoint' }
      },
      {
        time: { key: 'time' },
        point: { key: 'point' }
      }
    ]
    const state = reactive({
      contentKey: 'dailyTime',
      sortType: { title: '経験値', name: 'point', color: '#ff7f50' },
      fav: false
    })

    function setRanknigData() {
      const field = fields[props.tabs.rankingTab][state.sortType.name]
      state.contentKey = field.key
      userComponent.getList(field.key)
    }
    watch(
      () => [props.tabs.rankingTab, state.sortType],
      () => userComponent.reset()
    )
    watch(
      () => props.tabs.rankingTab,
      _.debounce(function() {
        setRanknigData()
      }, 100),
      { immediate: true }
    )
    watch(
      () => state.sortType,
      _.debounce(function() {
        setRanknigData()
      }, 100)
    )

    return {
      state,
      ...userComponent,
      toUser(id: string) {
        ToolTips.navigateTo(ctx, '/' + id)
      },
      setSortType(type: SortType) {
        state.sortType = type
      }
    }
  }
})
</script>
<style scoped lang="sass">
.floating-action-button
  margin-bottom: 64px
</style>
