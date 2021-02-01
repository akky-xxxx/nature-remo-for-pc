type Signal = {
  id: string
  name: string
  image: string
}

export type Appliance = {
  key: string
  id: string
  index: number
  nickname: string
  signals: Signal[]
}
