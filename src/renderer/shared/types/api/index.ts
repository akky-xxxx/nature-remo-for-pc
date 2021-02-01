type Signal = {
  id: string
  name: string
  image: string
}

export type Appliance = {
  key: string
  id: string
  nickname: string
  signals: Signal[]
}
