import { computed, reactive, toRefs } from '@vue/composition-api'
import firebase from 'firebase'
import UserModel from '@/models/firebase/UserModel'
import { User } from '@/types'

export default () => {
  const state = reactive({
    loading: false,
    isLogin: false,
    user: {} as firebase.User | null
  })

  function signInWithGoogle() {
    if (state.loading) return
    const provider = new firebase.auth.GoogleAuthProvider()
    new UserModel().signIn(provider)
  }

  function signInWithTwitter() {
    if (state.loading) return
    const provider = new firebase.auth.TwitterAuthProvider()
    new UserModel().signIn(provider)
  }

  function signInWithFacebook() {
    if (state.loading) return
    const provider = new firebase.auth.FacebookAuthProvider()
    new UserModel().signIn(provider)
  }

  function currentUser() {
    if (state.loading) return
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
    currentUser: computed(() => currentUser()),
    get,
    create,
    remove,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook
  }
}
