// import node_modules
import React, { useEffect, useState, useReducer, FC, Fragment } from "react"
import { Input, Table, TableProps, Row, Col, Button } from "antd"
import { ColumnsType } from "antd/es/table"
import arrayMove from "array-move"

// import components
import { ApplianceRecord } from "../../components/molecules/ApplianceRecord"

// import others
import { Appliance } from "../../../../../shared/types/api"
import { SortableWrapper } from "../../components/atoms/SortableWrapper"
import { SortableItem } from "../../components/atoms/SortableItem"
import { Channels } from "../../../../../shared/const/Channels"
import { DragHandle } from "../../components/atoms/DragHandle"
import { DraggableWrapperProps, DraggableItemProps } from "./types"
import { applianceReducer } from "./modules/applianceReducer"

// main
const {
  GET_APPLIANCES,
  POST_APPLIANCE_ORDERS,
  POST_APPLIANCES_APPLIANCE,
} = Channels
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
      <Fragment>
        <Row>
          <Col flex="70">
            <Input value={name} />
          </Col>
          <Col flex="auto">
            <Button>保存</Button>
          </Col>
        </Row>
      </Fragment>
    ),
  },
]

type ExpandedRowRender = TableProps<Appliance>["expandedRowRender"]
export const useHome = () => {
  const [data, setData] = useState<Appliance[]>([]) // TODO: 差し替え終わったら消す
  const [appliances, dispatchAppliance] = useReducer(applianceReducer, [])
  const handleSortEndAppliances = (
    args: Record<"oldIndex" | "newIndex", number>,
  ) => {
    dispatchAppliance({
      type: "changeOrder",
      payload: { ...args },
    })
  }

  const applianceColumns: ColumnsType<Appliance> = [
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
      render: (_nickname: string, record) => <ApplianceRecord {...record} />,
    },
  ]

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
    const index = appliances.findIndex(
      (appliance) => appliance.index === props["data-row-key"],
    )
    return <SortableItem index={index} {...props} />
  }

  const expandedRowRender: ExpandedRowRender = (record) => {
    const targetApplianceId = record.id
    const targetSignals = appliances.find(
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
      const newData = appliances.map((appliance) => {
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
      const index = appliances.findIndex(
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
    global.ipcRenderer.on(POST_APPLIANCES_APPLIANCE, () => {
      // eslint-disable-next-line no-alert
      alert("更新成功")
    })
    global.ipcRenderer.on(GET_APPLIANCES, (_event, args: Appliance[]) => {
      setData(args)
      dispatchAppliance({
        type: "initialize",
        payload: { appliances: args },
      })
    })
    global.ipcRenderer.send(GET_APPLIANCES, null)
  }, [])

  const handleSaveAppliancesOrder = () => {
    global.ipcRenderer.send(POST_APPLIANCE_ORDERS, appliances)
  }

  return {
    data, // TODO: 差し替え終わったら消す
    appliances,
    applianceColumns,
    DraggableAppliances,
    DraggableAppliance,
    expandedRowRender,
    handleSaveAppliancesOrder,
  }
}
