type Signal = {
  id: string
  name: string
  image: string
}

export type Appliance = {
  id: string
  nickname: string
  image: string
  signals: Signal[]
}
