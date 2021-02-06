// import node_modules
import React from "react"
import { SortableElement } from "react-sortable-hoc"

// main
// TODO: any 解決
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SortableItem = SortableElement((props: any) => <tr {...props} />)
