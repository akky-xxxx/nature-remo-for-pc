// import node_modules
import React, { useEffect, useState } from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { Table } from "antd"
import "antd/dist/antd.css"
import arrayMove from "array-move"

// import components
import { DragHandle } from "../components/templates/Home/components/atoms/DragHandle"

// import others
import { Channels } from "../shared/const/Channels"
import { Appliance } from "../shared/types/api"

// main
const { GET_APPLIANCES } = Channels

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    width: 30,
    className: "drag-visible",
    render: () => <DragHandle />,
  },
  {
    title: "Appliance",
    dataIndex: "nickname",
    className: "drag-visible",
  },
]

const SortableAppliance = SortableElement((props: any) => <tr {...props} />)
const SortableApplianceWrapper = SortableContainer((props: any) => (
  <tbody {...props} />
))

const IndexPage = () => {
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

  return (
    <div>
      <div>
        <button type="button" onClick={onSayHiClick}>
          get appliances
        </button>
      </div>

      <Table
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableWrapper,
            row: DraggableBodyRow,
          },
        }}
      />
    </div>
  )
}

export default IndexPage
