<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    v-tabs-items(v-model="tabs.rankingTab")
      v-tab-item(
        v-for="(el,index) in [0,1,2,3]"
        :key="index")
        v-container.pl-3.pb-0.mb-0
          v-row.pl-3.my-2(align="center")
            v-icon {{state.sortParams.icon}}
            span.title.ml-1 {{state.sortParams.title}}ランキング
        loading-circle(v-if="loading")
        template(v-else)
          user-list(
            :showRank="true"
            :userData="users"
            :sortType="state.sortParams.type"
            :contentKey="state.sortParams.key"
            color="#68B787"
            @clickedItem="toUser")
    floating-button(
      :params="sort.buttonParams"
      @selected="setSortParams")
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
import FloatingButton from '@/components/FloatingButton.vue'
import UserComponent from '@/modules/firebase/user'
import { ToolTips } from '@/mixins'
import _ from 'lodash'
type Props = {
  tabs: { homeTab: number; rankingTab: number }
}
export default defineComponent({
  components: { LoadingCircle, UserList, FloatingButton },
  props: {
    tabs: {}
  },
  setup(props: Props, ctx: SetupContext) {
    const userComponent = UserComponent()
    const sort = reactive({
      buttonParams: [
        {
          key: 'point',
          color: '#ff7f50',
          icon: '$point'
        },
        {
          key: 'time',
          color: '#4682b4',
          icon: '$working'
        }
      ],
      table: [
        [
          {
            type: 'point',
            title: '経験値',
            color: '#ff7f50',
            key: 'dailyPoint',
            icon: '$point'
          },
          {
            type: 'time',
            title: '労働時間',
            color: '#4682b4',
            key: 'dailyTime',
            icon: '$working'
          }
        ],
        [
          {
            type: 'point',
            title: '経験値',
            color: '#ff7f50',
            key: 'weeklyPoint',
            icon: '$point'
          },
          {
            type: 'time',
            title: '労働時間',
            color: '#4682b4',
            key: 'weeklyTime',
            icon: '$working'
          }
        ],
        [
          {
            type: 'point',
            title: '経験値',
            color: '#ff7f50',
            key: 'monthlyPoint',
            icon: '$point'
          },
          {
            type: 'time',
            title: '労働時間',
            color: '#4682b4',
            key: 'monthlyTime',
            icon: '$working'
          }
        ],
        [
          {
            type: 'point',
            title: '経験値',
            color: '#ff7f50',
            key: 'point',
            icon: '$point'
          },
          {
            type: 'time',
            title: '労働時間',
            color: '#4682b4',
            key: 'time',
            icon: '$working'
          }
        ]
      ]
    })
    const state = reactive({
      sortParams: sort.table[0][0],
      currentButtonIndex: 0
    })

    function setRanknigData() {
      state.sortParams =
        sort.table[props.tabs.rankingTab][state.currentButtonIndex]
      userComponent.getList(state.sortParams.key)
    }
    watch(
      () => props.tabs.rankingTab,
      () => userComponent.reset()
    )
    watch(
      () => props.tabs.rankingTab,
      _.debounce(function() {
        setRanknigData()
      }, 100),
      { immediate: true }
    )

    return {
      state,
      sort,
      ...userComponent,
      toUser(id: string) {
        ToolTips.navigateTo(ctx, '/' + id)
      },
      setSortParams(index: number) {
        userComponent.reset()
        state.currentButtonIndex = index
        setRanknigData()
      }
    }
  }
})
</script>
