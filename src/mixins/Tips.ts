import { SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'

function navigateTo(ctx: SetupContext, path: string) {
  if (path !== ctx.root.$route.path) ctx.root.$router.push(path)
}

function toStr(date: Date) {
  return dayjs(date).format('YYYY年MM月DD日')
}

function repeatMonth(date: Date, func: any) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  for (let i = 0; i < lastDay; i++)
    func(new Date(date.getFullYear(), date.getMonth(), i + 1))
}

export default { navigateTo, toStr, repeatMonth }
