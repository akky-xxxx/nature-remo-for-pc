type Signal = {
  id: string
  name: string
  image: string
}

export type Appliance = {
  id: string
  nickname: string
  signals: Signal[]
}
