// import node_modules
import React from "react"
import { SortableHandle } from "react-sortable-hoc"
import { MenuOutlined } from "@ant-design/icons"

// main
export const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer" }} />
))
