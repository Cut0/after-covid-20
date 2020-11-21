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
            v-if="isLogin&&currentUser.isComplated"
            @click="$refs.register.open()"
            max-width="598")
            v-list-item-icon
              v-icon $reset
            v-list-item-content
              v-list-item-title キャラクターの再設定
          v-list-item(
            v-if="isLogin"
            @click="$refs.logout.open()"
            max-width="598")
            v-list-item-icon
              v-icon $logout
            v-list-item-content
              v-list-item-title ログアウト
          v-divider
          v-list-item(
            v-if="isLogin"
            @click="$refs.withdrawal.open()"
            max-width="598")
            v-list-item-icon
              v-icon $exit
            v-list-item-content
              v-list-item-title 退会する
      confirm-modal(
        ref="logout"
        title="ログアウトしますか？" content="再度ログインする際にはアカウントによる認証が必要となります。"
        @ok="signOut")
      confirm-modal(
        ref="withdrawal"
        title="退会しますか？" content="退会した場合今までのデータは全て削除され、復元できなくなります。"
        @ok="deleteUser")
      register-modal(
        ref="register"
        title="キャラクターを再設定" 
        content="名前を変えちゃいます"
        buttonName="登録"
        @ok="registerPet"
      )
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import RegisterModal from '@/components/modals/RegisterModal.vue'
import UserComponent from '@/modules/firebase/user'
import LogComponent from '@/modules/firebase/log'
export default defineComponent({
  components: { ConfirmModal, RegisterModal },
  setup() {
    const userComponent = UserComponent()
    const logComponent = LogComponent()
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
      registerPet({ name }: { name: string }) {
        const currentUser = userComponent.currentUser.value
        currentUser.petName = name
        currentUser.isComplated = true
        userComponent.update(currentUser)
      },
      deleteUser() {
        logComponent.remove(userComponent.currentUser.value.id)
        userComponent.remove(userComponent.currentUser.value)
      }
    }
  }
})
</script>
