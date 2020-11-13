export type User = {
  id: string
  photoURL: string | null
  displayName: string | null
  petCode: string | null
  petName: string | null
  level: number
  point: number
  time: number
  isWorking: boolean
  monthlyTime: number
  monthlyPoint: number
  weeklyTime: number
  weeklyPoint: number
  dailyTime: number
  dailyPoint: number
  isComplated: boolean
  lastSitDate: Date
  lastStandDate: Date
  petPhotoURL: string
}

export type Log = {
  uid: string
  date: Date
  time: number
  point: number
  level: number
}

export type Notification = {
  title: string
  content: string
  photoURL: string
}
