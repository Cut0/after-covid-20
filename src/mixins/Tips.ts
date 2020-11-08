import { SetupContext } from '@vue/composition-api'

function navigateTo(ctx: SetupContext, path: string) {
  if (path !== ctx.root.$route.path) ctx.root.$router.push(path)
}

function isEmpty(obj = {}) {
  return !Object.keys(obj).length
}

export default { navigateTo, isEmpty }
