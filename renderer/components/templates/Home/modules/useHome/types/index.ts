export type DraggableWrapperProps = {
  className?: string
}

export type DraggableItemProps = {
  className?: string
  "data-row-key": number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (...args: any) => any
}
