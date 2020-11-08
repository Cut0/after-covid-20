<template lang="pug">
  v-row.pa-0(justify="center")
    .cover
      .wrapper#working.poyooon(v-show="isWorking")
        img(:src="photoURL")
      .wrapper#not-working.korokoro(v-show="!isWorking")
        img(:src="photoURL")
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
type Props = {
  isWorking: boolean
  photoURL: string
}
export default defineComponent({
  props: {
    isWorking: {
      type: Boolean
    },
    photoURL: {
      type: String
    }
  },
  setup(props: Props) {
    onMounted(() => {
      const element = document.getElementById('working') as HTMLElement
      function looopAnimation(id: string, className: string, delay: number) {
        const element = document.getElementById(id) as HTMLElement
        function playAnimation() {
          element.classList.add(className)
        }
        function listener(event: any) {
          event.target.classList.remove(className)
          setTimeout(playAnimation, delay)
        }
        element.addEventListener('animationend', listener)
      }
      looopAnimation('working', 'poyooon', 1000)
      looopAnimation('not-working', 'korokoro', 1000)
    })
  }
})
</script>
<style scoped lang="sass">
.cover
  height: 300px
  display: flex
  align-items: flex-end
.wrapper
  height: 200px
  width: 200px
  > img
    width: 200px
.poyooon
  -webkit-animation: poyooon 0.9s linear 0s 1
  animation: poyooon 0.9s linear 0s 1
@-webkit-keyframes poyooon
  0%
    -webkit-transform: scale(1.0, 1.0) translate(0%, 0%)
  10%
    -webkit-transform: scale(1.1, 0.9) translate(0%, 5%)
  40%
    -webkit-transform: scale(1.2, 0.8) translate(0%, 15%)
  50%
    -webkit-transform: scale(1.0, 1.0) translate(0%, 0%)
  60%
    -webkit-transform: scale(0.9, 1.2) translate(0%, -100%)
  75%
    -webkit-transform: scale(0.9, 1.2) translate(0%, -20%)
  85%
    -webkit-transform: scale(1.2, 0.8) translate(0%, 15%)
  100%
    -webkit-transform: scale(1.0, 1.0) translate(0%, 0%)
@keyframes poyooon
  0%
    transform: scale(1.0, 1.0) translate(0%, 0%)
  10%
    transform: scale(1.1, 0.9) translate(0%, 5%)
  40%
    transform: scale(1.2, 0.8) translate(0%, 15%)
  50%
    transform: scale(1.0, 1.0) translate(0%, 0%)
  60%
    transform: scale(0.9, 1.2) translate(0%, -100%)
  75%
    transform: scale(0.9, 1.2) translate(0%, -20%)
  85%
    transform: scale(1.2, 0.8) translate(0%, 15%)
  100%
    transform: scale(1.0, 1.0) translate(0%, 0%)
.korokoro
  -webkit-animation: korokoro 2.5s linear 0s 1
  animation: korokoro 2.5s linear 0s 1
@-webkit-keyframes korokoro
  0%
    -webkit-transform: translate(0%, 0%)
  5%
    -webkit-transform: translate(10%, 0%) rotate(10deg)
  25%
    -webkit-transform: translate(20%, 0%) rotate(20deg)
  30%
    -webkit-transform: translate(-10%, 0%) rotate(-10deg)
  35%
    -webkit-transform: translate(-15%, 0%) rotate(-15deg)
  45%
    -webkit-transform: translate(10%, 0%) rotate(10deg)
  50%
    -webkit-transform: translate(15%, 0%) rotate(15deg)
  60%
    -webkit-transform: translate(-5%, 0%) rotate(-5deg)
  65%
    -webkit-transform: translate(-7%, 0%) rotate(-7deg)
  75%
    -webkit-transform: translate(0%, 0%) rotate(0deg)
  100%
    -webkit-transform: translate(0%, 0%) rotate(0deg)
@keyframes korokoro
  0%
    transform: translate(0%, 0%)
  5%
    transform: translate(10%, 0%) rotate(10deg)
  25%
    transform: translate(20%, 0%) rotate(20deg)
  30%
    transform: translate(-10%, 0%) rotate(-10deg)
  35%
    transform: translate(-15%, 0%) rotate(-15deg)
  45%
    transform: translate(10%, 0%) rotate(10deg)
  50%
    transform: translate(15%, 0%) rotate(15deg)
  60%
    transform: translate(-5%, 0%) rotate(-5deg)
  65%
    transform: translate(-7%, 0%) rotate(-7deg)
  75%
    transform: translate(0%, 0%) rotate(0deg)
  100%
    transform: translate(0%, 0%) rotate(0deg)
</style>
