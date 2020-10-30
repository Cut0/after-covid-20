<template lang="pug">
  v-dialog(
    v-model="state.isOpened" 
    @click:outside="stateReset"
    width="400")
    v-card.mx-auto
      v-img.image-preview(
        :src="state.uploadImageUrl"
        alt="モーダルのヘッダー"
        class="white--text align-end"
        height="200px"
        @click="imageSet")
          v-row.fill-height.ma-0(
            align="center"
            justify="center")
            v-icon(
              v-if="!state.uploadImageUrl"
              x-large) $upload
      input.image-input#image-input(
        type="file"
        @change="onImagePicked"
        accept="image/*")
      v-card-title アイテムを追加
      v-card-text
        v-select(
          v-model="state.itemType"
          :items="['A','B','C','D']"
          label="アイテムの種類を選択"
          item-color="#68B787"
          color="#68B787")
        v-text-field(
          v-model="state.hangerCode"
          name="input-10-1" label="ハンガーコード" color="#68B787")
        span.content お気に入り度
        v-rating(
          v-model="state.rate"
          empty-icon="$starOutline"
          full-icon="$star"
          half-icon="$starHalf"
          half-increments
          hover
          length="5"
          size="44"
          :value="3"
          background-color="#68B787"
          color="#68B787")
      v-card-actions
        v-spacer
        v-btn(
          @click="buttonClicked('cancel')"
          color="#68B787" text) キャンセル
        v-btn(
          @click="buttonClicked('ok')"
          color="#68B787" text) 決定
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from '@vue/composition-api'
export default defineComponent({
  setup(_, context: SetupContext) {
    const state = reactive({
      isOpened: false,
      rate: 3,
      itemType: '',
      hangerCode: '',
      uploadImageUrl: ''
    })

    function stateReset() {
      state.uploadImageUrl = ''
      state.itemType = ''
      state.hangerCode = ''
      state.rate = 3
    }

    return {
      state,
      stateReset,
      imageSet() {
        const input: any = document.querySelector('#image-input')
        input.click()
      },
      onImagePicked(e: any) {
        e.preventDefault()
        if (e.target.files.length === 0) return
        const file: File = e.target.files[0]
        if (file !== undefined && file !== null) {
          if (file.name.lastIndexOf('.') <= 0) return
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            state.uploadImageUrl = fr.result as string
          })
        } else state.uploadImageUrl = ''
      },
      open() {
        state.isOpened = true
      },
      buttonClicked(name: string) {
        state.isOpened = false
        context.emit(name)
        stateReset()
      }
    }
  }
})
</script>
<style scoped lang="sass">
.image-input
  display: none
.image-preview
  display: flex
  align-items: center !important
  background-color: grey
</style>
