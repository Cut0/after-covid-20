import { SetupContext } from '@vue/composition-api'

function navigateTo(ctx: SetupContext, path: string) {
  if (path !== ctx.root.$route.path) ctx.root.$router.push(path)
}

function isEmpty(obj = {}) {
  return !Object.keys(obj).length
}

const restBaseTime = 60
function workingPoint(workingTime: number, lastStandDate: Date) {
  const restSpan = Math.abs(
    (new Date().getTime() - lastStandDate.getTime()) / 60000
  )
  if (restSpan < restBaseTime) return 0
  if (workingTime >= 580) return -317.5
  const params = (workingTime + 20) / 200
  return (
    150 *
      ((1 / 4) * Math.pow(params, 4) -
        (4 / 3) * Math.pow(params, 3) +
        (3 / 2) * Math.pow(params, 2)) +
    20
  )
}

export default { navigateTo, isEmpty, workingPoint }
