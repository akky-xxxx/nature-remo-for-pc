// import node_modules
import React, { useEffect, useState } from "react"
import { Form, Input, Table, TableProps } from "antd"
import arrayMove from "array-move"

// import others
import { Appliance } from "../../../../../shared/types/api"
import { SortableApplianceWrapper } from "../../components/atoms/SortableApplianceWrapper"
import { SortableAppliance } from "../../components/atoms/SortableAppliance"
import { Channels } from "../../../../../shared/const/Channels"
import { DragHandle } from "../../components/atoms/DragHandle"

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
    title: "Signal",
    dataIndex: "name",
    className: "drag-visible",
    render: (name: string) => (
      <Form.Item rules={[{ required: true }]}>
        <Input value={name} />
      </Form.Item>
    ),
  },
]

type ExpandedRowRender = TableProps<Appliance>["expandedRowRender"]
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

  const expandedRowRender: ExpandedRowRender = (record) => {
    const signalsData = record.signals
    return (
      <Table columns={columns} dataSource={signalsData} pagination={false} />
    )
  }

  useEffect(() => {
    global.ipcRenderer.on(GET_APPLIANCES, (_event, args: Appliance[]) => {
      setData(args)
    })
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send(GET_APPLIANCES, null)
  }

  return {
    data,
    DraggableWrapper,
    DraggableBodyRow,
    expandedRowRender,
    onSayHiClick,
  }
}