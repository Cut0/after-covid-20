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
}

export type Log = {
  id: string
  uid: string
  date: Date
  time: number
  point: number
  level: number
}

export type Notification = {
  title: string
  content: string
}

export type StateChanger = {
  loaded: () => void
  complete: (noResults?: boolean) => void
  reset: () => void
  error: () => void
}
