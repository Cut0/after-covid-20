import { SetupContext } from '@vue/composition-api'

function navigateTo(ctx: SetupContext, path: string) {
  if (path !== ctx.root.$route.path) ctx.root.$router.push(path)
}

export default { navigateTo }
