import { provide, reactive, toRefs } from '@vue/composition-api'
import firebase from 'firebase'
import UserModel from '@/models/firebase/UserModel'
import { User } from '@/types'

export default function UserComponent() {
  const state = reactive({
    loading: false,
    isLogin: false,
    user: {} as firebase.User | null
  })

  function signInWithGoogle() {
    if (state.loading) return
    const provider = new firebase.auth.GoogleAuthProvider()
    new UserModel().signIn(provider).then(el => {
      console.log(el)
      state.user = el.user
      state.isLogin = true
    })
  }

  function signInWithTwitter() {
    if (state.loading) return
    const provider = new firebase.auth.TwitterAuthProvider()
    new UserModel().signIn(provider).then(el => {
      console.log(el)
      state.user = el.user
      state.isLogin = true
    })
  }

  function signInWithFacebook() {
    if (state.loading) return
    const provider = new firebase.auth.FacebookAuthProvider()
    new UserModel().signIn(provider).then(el => {
      console.log(el)
      state.user = el.user
      state.isLogin = true
    })
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
    get,
    create,
    remove,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook
  }
}
export type UserStore = ReturnType<typeof UserComponent>
