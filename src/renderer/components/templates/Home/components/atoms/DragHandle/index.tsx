// import node_modules
import React from "react"
import { SortableHandle } from "react-sortable-hoc"
import { MenuOutlined } from "@ant-design/icons"

// main
export const DragHandle = SortableHandle(() => (
  // TODO: 並び替えが sp に反映されないため、操作できないようにしておく
  <MenuOutlined style={{ cursor: "pointer", pointerEvents: "none" }} />
))
