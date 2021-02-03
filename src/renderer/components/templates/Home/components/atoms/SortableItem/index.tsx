// import node_modules
import React from "react"
import { SortableElement } from "react-sortable-hoc"

// main
export const SortableItem = SortableElement((props: any) => <tr {...props} />)
