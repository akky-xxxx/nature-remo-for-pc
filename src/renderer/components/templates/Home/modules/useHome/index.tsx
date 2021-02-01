// import node_modules
import React, { useEffect, useState } from "react"
import arrayMove from "array-move"

// import others
import { Appliance } from "../../../../../shared/types/api"
import { SortableApplianceWrapper } from "../../components/atoms/SortableApplianceWrapper"
import { SortableAppliance } from "../../components/atoms/SortableAppliance"
import { Channels } from "../../../../../shared/const/Channels"

// main
const { GET_APPLIANCES } = Channels
export const useHome = () => {
  const [data, setData] = useState<Appliance[]>([])
  const onSortEnd = (args: Record<"oldIndex" | "newIndex", number>) => {
    const { oldIndex, newIndex } = args
    if (oldIndex === newIndex) return
    const newData = arrayMove([...data], oldIndex, newIndex).filter(Boolean)
    setData(newData)
  }

  const DraggableWrapper = (props: any) => (
    <SortableApplianceWrapper
      useDragHandle
      disableAutoScroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const DraggableBodyRow = (props: any) => {
    const index = data.findIndex(
      (appliance) => appliance.index === props["data-row-key"],
    )
    return <SortableAppliance index={index} {...props} />
  }

  useEffect(() => {
    global.ipcRenderer.on(GET_APPLIANCES, (_event, args: Appliance[]) => {
      setData(args)
    })
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send(GET_APPLIANCES, null)
  }

  return { data, DraggableWrapper, DraggableBodyRow, onSayHiClick }
}
