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

function toTimeStr(sec: number) {
  const hours = Math.floor(sec / 3600).toString()
  let minutes = Math.floor((sec % 3600) / 60).toString()
  if (minutes.length < 2) minutes = '0' + minutes
  let seconds = Math.floor(sec % 60).toString()
  if (seconds.length < 2) seconds = '0' + seconds
  return hours + ':' + minutes + ':' + seconds
}

function toTimeMinuteStr(min: number) {
  const hours = Math.floor(min / 60).toString()
  let minutes = Math.floor(min % 60).toString()
  if (minutes.length < 2) minutes = '0' + minutes
  return hours + '時間' + minutes + '分'
}

function dateDiff(endDate: Date, startDate: Date) {
  const diff = (endDate.getTime() - startDate.getTime()) / 1000
  return diff
}

const FirstDateInYear = firstDateInYear()
const LastDateInYear = lastDateInYear()
export default {
  toStr,
  repeatMonth,
  toTimeStr,
  dateDiff,
  FirstDateInYear,
  LastDateInYear,
  toTimeMinuteStr
}
