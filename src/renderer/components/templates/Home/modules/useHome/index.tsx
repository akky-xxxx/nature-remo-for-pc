// import node_modules
import React, { useEffect, useState, useReducer, FC } from "react"
import { Table, TableProps } from "antd"
import { ColumnsType } from "antd/es/table"
import arrayMove from "array-move"

// import components
import { ApplianceRecord } from "../../components/molecules/ApplianceRecord"
import { SignalRecord } from "../../components/molecules/SignalRecord"

// import others
import { Appliance, Signal } from "../../../../../shared/types/api"
import { SortableWrapper } from "../../components/atoms/SortableWrapper"
import { SortableItem } from "../../components/atoms/SortableItem"
import { Channels } from "../../../../../shared/const/Channels"
import { DragHandle } from "../../components/atoms/DragHandle"
import { DraggableWrapperProps, DraggableItemProps } from "./types"
import { applianceReducer } from "./modules/applianceReducer"
import { thisAlert } from "../../../../../shared/utils/thisAlert"

// main
const {
  GET_APPLIANCES,
  POST_APPLIANCE_ORDERS,
  POST_APPLIANCES_APPLIANCE,
  POST_SIGNALS_SIGNAL,
} = Channels

type ExpandedRowRender = TableProps<Appliance>["expandedRowRender"]
export const useHome = () => {
  const [data, setData] = useState<Appliance[]>([]) // TODO: 差し替え終わったら消す
  const [appliances, dispatchAppliance] = useReducer(applianceReducer, [])
  const [isLoading, setLoading] = useState(false)
  const handleShowSpinner = () => setLoading(true)
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
      render: (_nickname: string, record) => <ApplianceRecord handleShowSpinner={handleShowSpinner} {...record} />,
    },
  ]

  const columns: ColumnsType<Signal> = [
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
      render: (_name, record) => <SignalRecord handleShowSpinner={handleShowSpinner} {...record} />,
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
    global.ipcRenderer.on(
      POST_APPLIANCES_APPLIANCE,
      (_event: unknown, args: unknown) => {
        thisAlert(args !== false ? "機器名の更新成功" : "機器名の更新失敗")
        setLoading(false)
      },
    )
    global.ipcRenderer.on(
      POST_SIGNALS_SIGNAL,
      (_event: unknown, args: unknown) => {
        thisAlert(
          args !== false ? "シグナル名の更新成功" : "シグナル名の更新失敗",
        )
        setLoading(false)
      },
    )
    global.ipcRenderer.on(
      GET_APPLIANCES,
      (_event, args: Appliance[] | false) => {
        if (args === false) {
          return thisAlert("一覧の取得に失敗しました")
        }
        setData(args)
        setLoading(false)
        return dispatchAppliance({
          type: "initialize",
          payload: { appliances: args },
        })
      },
    )
    setLoading(true)
    global.ipcRenderer.send(GET_APPLIANCES, null)
  }, [])

  const handleSaveAppliancesOrder = () => {
    setLoading(true)
    global.ipcRenderer.send(POST_APPLIANCE_ORDERS, appliances)
  }

  return {
    data, // TODO: 差し替え終わったら消す
    appliances,
    applianceColumns,
    isLoading,
    DraggableAppliances,
    DraggableAppliance,
    expandedRowRender,
    handleSaveAppliancesOrder,
  }
}
