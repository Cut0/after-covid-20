export type User = {
  point: number
  currentSpotId: number
  snsType: string
  snsId: string
}

export type Spot = {
  count: number
  point: number
  category: string
  name: string
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
