import { computed, reactive, toRefs } from '@vue/composition-api'
import UserModel from '@/models/firebase/UserModel'
import { StateChanger, User } from '@/types'

export default () => {
  const perPage = 20
  let cursor = 0
  let isLast = false
  const state = reactive({
    loading: false,
    isLogin: false,
    user: {} as User,
    users: [] as User[],
    identifier: 1
  })

  async function reset() {
    state.users = []
    cursor = 0
    isLast = false
    state.identifier++
  }

  function createQuery() {
    return {
      offset: cursor,
      limit: cursor + perPage - 1
    }
  }

  function signInWithGoogle() {
    if (state.loading) return
    state.loading = true
    return new UserModel().signInWithGoogle().finally(() => {
      state.loading = false
    })
  }

  function signInWithTwitter() {
    if (state.loading) return
    state.loading = true
    return new UserModel().signInWithTwitter().finally(() => {
      state.loading = false
    })
  }

  function signInWithFacebook() {
    if (state.loading) return
    state.loading = true
    return new UserModel().signInWithFacebook().finally(() => {
      state.loading = false
    })
  }

  function signOut() {
    if (state.loading) return
    return new UserModel().signOut()
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

  async function getList(sortKey = 'id') {
    if (isLast || state.loading) return
    state.loading = true
    return new UserModel()
      .getList(createQuery(), sortKey)
      .then((res: any) => {
        state.users.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function infiniteHandler($state: StateChanger) {
    await getList()
    if (isLast) {
      $state.complete(!state.users.length)
    } else {
      $state.loaded()
    }
    cursor += perPage
  }

  async function getAll(sortkey = 'id') {
    if (isLast || state.loading) return
    state.loading = true
    return new UserModel()
      .getAll(sortkey)
      .then((res: any) => {
        state.users.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function update(user: User) {
    if (state.loading) return
    return new UserModel().update(user)
  }

  async function remove() {
    if (state.loading) return
    console.log('user削除')
  }

  return {
    ...toRefs(state),
    isLogin: computed(() => isLogin()),
    currentUser: computed(() => currentUser()),
    reset,
    getList,
    getAll,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    signOut,
    update
  }
}
