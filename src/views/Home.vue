<template lang="pug">
v-row(justify="center" no-gutters)  
  v-responsive(max-width="598" width="375")
    v-speed-dial.floating-action-button(v-model="state.fab" fixed bottom right transition="slide-y-reverse-transition")
      template(v-slot:activator='')
        v-btn(v-model='state.fab' color="#2e8b57" dark='' fab='')
          v-icon(v-if='state.fab') $close
          v-icon(v-else='') $account
      v-btn(fab='' dark='' small='' color='#f0e68c' @click="$refs.itemAdder.open()")
        v-icon $plus
      v-btn(fab='' dark='' small='' color='#4682b4')
        v-icon $edit
      v-btn(fab='' dark='' small='' color='#ff7f50')
        v-icon $delete
  image-modal(
    @ok="createItem($event)"
    ref="itemAdder")
</template>
<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import ImageModal from '@/components/modals/ImageModal.vue'
import ItemComponetnt from '@/modules/firebase/item'
import UserComponent from '@/modules/firebase/user'
export default defineComponent({
  components: { ImageModal },
  setup() {
    const state = reactive({
      fab: false
    })
    const itemComponent = ItemComponetnt()
    const userComponent = UserComponent()
    return {
      state,
      ...itemComponent,
      createItem(data: {
        imageUrl: string
        itemType: string
        hangerCode: string
      }) {
        itemComponent.create(
          {
            id: '',
            uid: userComponent.currentUser.value.uid,
            imagePath: '',
            itemType: data.itemType,
            hangerCode: data.hangerCode
          },
          data.imageUrl
        )
      }
    }
  }
})
</script>
<style scoped lang="sass">
.v-card
  min-height: calc(100vh - 120px)
.img-wrapper
  width: 100px
  height: 100px
  position: relative
  border-radius: 50%
  background-color: grey
.img-wrapper > img
  position: absolute
  top: 50%
  left: 50%
  width: 100px
  height: 100px
  object-fit: cover
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  border-radius: 50%
.floating-action-button
  margin-bottom: 64px
</style>
