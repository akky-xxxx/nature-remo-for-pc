// import node_modules
import React, { useEffect, useState, FC } from "react"
import { Form, Input, Table, TableProps } from "antd"
import arrayMove from "array-move"

// import others
import { Appliance } from "../../../../../shared/types/api"
import { SortableWrapper } from "../../components/atoms/SortableWrapper"
import { SortableItem } from "../../components/atoms/SortableItem"
import { Channels } from "../../../../../shared/const/Channels"
import { DragHandle } from "../../components/atoms/DragHandle"
import { DraggableWrapperProps, DraggableItemProps } from "./types"

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
  const handleSortEndAppliances = (
    args: Record<"oldIndex" | "newIndex", number>,
  ) => {
    const { oldIndex, newIndex } = args
    if (oldIndex === newIndex) return
    const newData = arrayMove([...data], oldIndex, newIndex).filter(Boolean)
    setData(newData)
  }

  const DraggableAppliances: FC<DraggableWrapperProps> = (props) => (
    <SortableWrapper
      useDragHandle
      disableAutoScroll
      helperClass="row-dragging"
      onSortEnd={handleSortEndAppliances}
      {...props}
    />
  )

  const DraggableAppliance: FC<DraggableItemProps> = (props) => {
    const index = data.findIndex(
      (appliance) => appliance.index === props["data-row-key"],
    )
    return <SortableItem index={index} {...props} />
  }

  const expandedRowRender: ExpandedRowRender = (record) => {
    const targetApplianceId = record.id
    const targetSignals = data.find(
      (appliance) => appliance.id === targetApplianceId,
    )?.signals
    if (!targetSignals) return null
    // TODO: 並び替えがバグるので調査
    const handleSortEndSignals = (
      args: Record<"oldIndex" | "newIndex", number>,
    ) => {
      const { oldIndex, newIndex } = args
      if (oldIndex === newIndex) return
      const newSignal = arrayMove(
        [...targetSignals],
        oldIndex,
        newIndex,
      ).filter(Boolean)
      const newData = data.map((appliance) => {
        if (appliance.id !== targetApplianceId) return appliance
        return {
          ...appliance,
          signals: newSignal,
        }
      })
      setData(newData)
    }

    const DraggableSignals: FC<DraggableWrapperProps> = (props) => (
      <SortableWrapper
        useDragHandle
        disableAutoScroll
        helperClass="row-dragging"
        onSortEnd={handleSortEndSignals}
        {...props}
      />
    )

    const DraggableSignal: FC<DraggableItemProps> = (props) => {
      const index = data.findIndex(
        (appliance) => appliance.index === props["data-row-key"],
      )
      return <SortableItem index={index} {...props} />
    }
    return (
      <Table
        columns={columns}
        dataSource={targetSignals}
        pagination={false}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableSignals,
            row: DraggableSignal,
          },
        }}
      />
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
    DraggableAppliances,
    DraggableAppliance,
    expandedRowRender,
    onSayHiClick,
  }
}
