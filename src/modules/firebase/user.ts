import { computed, reactive, toRefs } from '@vue/composition-api'
import LogComponent from '@/modules/firebase/log'
import UserModel from '@/models/firebase/UserModel'
import { User } from '@/types'
import { ToolTips } from '@/mixins'

export default () => {
  const perPage = 100
  let cursor = 0
  let isLast = false
  const state = reactive({
    loading: false,
    isLogin: false,
    user: {} as User,
    users: [] as User[]
  })

  async function reset() {
    state.user = {} as User
    state.users = []
    cursor = 0
    isLast = false
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

  async function create(user: User) {
    return new UserModel().create(user)
  }

  async function get(uid: string) {
    if (state.loading) return
    return await new UserModel().get(uid).then((res: any) => {
      state.user = res.data
    })
  }

  async function getList(sortKey = 'id') {
    if (isLast || state.loading) return
    state.loading = true
    return await new UserModel()
      .getList(createQuery(), sortKey)
      .then((res: any) => {
        state.users.push(...res.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  async function update(user: User) {
    if (state.loading) return
    return await new UserModel().update(user)
  }

  async function remove(user: User) {
    if (state.loading) return
    await new UserModel().remove(user.id)
    return await signOut()
  }

  async function startWork() {
    const user = currentUser()
    user.isWorking = true
    user.lastSitDate = new Date()
    return await update(user)
  }

  async function finishWork() {
    const user = currentUser()
    const workingTime =
      (new Date().getTime() - user.lastSitDate.getTime()) / 60000
    const point = ToolTips.workingPoint(workingTime, user.lastSitDate)
    user.isWorking = false
    user.lastStandDate = new Date()
    user.time += workingTime
    user.dailyTime += workingTime
    user.weeklyTime += workingTime
    user.monthlyTime += workingTime
    user.point += point
    user.dailyPoint += point
    user.weeklyPoint += point
    user.monthlyPoint += point
    user.level = Math.floor(user.point / 200)
    const images = [
      'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/0%2Fb%2Fimage.png?alt=media&token=6f9605bf-1661-4baf-a28a-7592e46d3d4a',
      'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/5%2Fb%2Fimage.png?alt=media&token=4dd9b5ec-a287-4ab0-bae8-7b2e2e374023',
      'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/10%2Fb%2Fimage.png?alt=media&token=1c02d1b8-1b02-4ea5-aac8-d768b1b81495',
      'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/15%2Fb%2Fimage.png?alt=media&token=9058552f-0f34-4171-ba4a-44edbc0bc153',
      'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/20%2Fb%2Fimage.png?alt=media&token=fd93c018-a599-4a0a-90bc-fa9701cdaabd',
      'https://firebasestorage.googleapis.com/v0/b/after-covid-hack.appspot.com/o/25%2Fb%2Fimage.png?alt=media&token=b785faec-b4ae-49e0-aa76-f5fc8c5cd35e'
    ]
    user.petPhotoURL =
      images[Math.floor(user.level / 10) >= 5 ? 5 : Math.floor(user.level / 10)]
    await update(user)
    const logComponent = LogComponent()
    return await logComponent.create({
      date: new Date(),
      uid: user.id,
      level: user.level,
      point: point,
      time: workingTime
    })
  }

  return {
    ...toRefs(state),
    isLogin: computed(() => isLogin()),
    currentUser: computed(() => currentUser()),
    reset,
    create,
    get,
    getList,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    signOut,
    update,
    remove,
    startWork,
    finishWork
  }
}
