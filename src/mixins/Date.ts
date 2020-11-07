import dayjs from 'dayjs'
function toStr(date: Date) {
  return dayjs(date).format('YYYY年MM月DD日')
}

function repeatMonth(date: Date, func: any) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  for (let i = 0; i < lastDay; i++)
    func(new Date(date.getFullYear(), date.getMonth(), i + 1))
}

function firstDateInYear() {
  const today = new Date()
  return new Date(today.getFullYear(), 0, 1)
}

function lastDateInYear() {
  const today = new Date()
  return new Date(today.getFullYear() + 1, 0, 1)
}
const FirstDateInYear = firstDateInYear()
const LastDateInYear = lastDateInYear()
export default { toStr, repeatMonth, FirstDateInYear, LastDateInYear }
