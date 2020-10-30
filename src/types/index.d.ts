export type User = {
  point: number
  currentSpotId: number
  snsType: string
  snsId: string
}

export type Item = {
  id: string
  uid: string
  imageURL: string
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
