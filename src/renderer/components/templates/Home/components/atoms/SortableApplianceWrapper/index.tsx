// import node_modules
import React from "react"
import { SortableContainer } from "react-sortable-hoc"

// main
export const SortableApplianceWrapper = SortableContainer((props: any) => (
  <tbody {...props} />
))
