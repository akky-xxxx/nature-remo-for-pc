type Signal = {
  id: string
  name: string
  index: number
  image: string
}

export type Appliance = {
  key: string
  id: string
  index: number
  image: string
  nickname: string
  signals: Signal[]
}
