import { computed, reactive, toRefs } from '@vue/composition-api'
import UserModel from '@/models/firebase/UserModel'
import { User } from '@/types'

export default () => {
  const state = reactive({
    loading: false,
    isLogin: false
  })

  function signInWithGoogle() {
    if (state.loading) return
    new UserModel().signInWithGoogle()
  }

  function signInWithTwitter() {
    if (state.loading) return
    new UserModel().signInWithTwitter()
  }

  function signInWithFacebook() {
    if (state.loading) return
    new UserModel().signInWithFacebook()
  }

  function signOut() {
    if (state.loading) return
    new UserModel().signOut()
  }

  function isLogin() {
    if (state.loading) return
    return new UserModel().isLogin()
  }

  function currentUser() {
    return new UserModel().currentData()
  }

  async function get() {
    if (state.loading) return
    console.log('user情報取得')
  }

  async function create() {
    if (state.loading) return
    console.log('user作成')
  }

  async function remove() {
    if (state.loading) return
    console.log('user削除')
  }

  return {
    ...toRefs(state),
    isLogin: computed(() => isLogin()),
    currentUser: computed(() => currentUser()),
    get,
    create,
    remove,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    signOut
  }
}
