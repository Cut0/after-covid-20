<template lang="pug">
v-row(no-gutters justify="center")  
  v-responsive(max-width="598" width="375")
    v-container.pa-0
      v-list
        v-list-item-group(color="#68B787")
          v-list-item(
            v-for="el in state.logins"
            @click="el.event"
            max-width="598")
            v-list-item-icon
              v-icon {{el.icon}}
            v-list-item-content
              v-list-item-title {{el.content}}
          v-list-item(
            @click="$refs.logout.open()"
            max-width="598")
            v-list-item-icon
              v-icon $logout
            v-list-item-content
              v-list-item-title ログアウト
          v-divider
          v-list-item(
            @click="$refs.withdrawal.open()"
            max-width="598")
            v-list-item-icon
              v-icon $exit
            v-list-item-content
              v-list-item-title 退会する
      template(v-if="!loading")
        register-card(
          v-if="isLogin&&currentUser.isComplated"
          title="クッションを再設定" 
          content="名前を変えちゃいます"
          buttonName="登録"
          @ok="registerPet")
      confirm-modal(
        ref="logout"
        title="ログアウトしますか？" content="再度ログインする際にはアカウントによる認証が必要となります。"
        @ok="signOut")
      confirm-modal(
        ref="withdrawal"
        title="退会しますか？" content="退会した場合今までのデータは全て削除され、復元できなくなります。")
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import UserComponent from '@/modules/firebase/user'
import RegisterCard from '@/components/cards/RegisterCard.vue'
export default defineComponent({
  components: { ConfirmModal, RegisterCard },
  setup() {
    const userComponent = UserComponent()
    const logins = {
      google: {
        icon: '$google',
        content: 'Googleアカウントでログイン',
        event: () => {
          console.log('google')
          userComponent.signInWithGoogle()
        }
      },
      twitter: {
        icon: '$twitter',
        content: 'Twitterアカウントでログイン',
        event: () => {
          console.log('twitter')
          userComponent.signInWithTwitter()
        }
      },
      facebook: {
        icon: '$facebook',
        content: 'Facebookアカウントでログイン',
        event: () => {
          console.log('facebook')
          userComponent.signInWithFacebook()
        }
      }
    }
    const state = reactive({ logins })
    return {
      state,
      ...userComponent,
      registerPet({ name, code }: { name: string; code: string }) {
        const currentUser = userComponent.currentUser.value
        currentUser.petName = name
        currentUser.petCode = code
        currentUser.isComplated = true
        userComponent.update(currentUser)
      }
    }
  }
})
</script>
