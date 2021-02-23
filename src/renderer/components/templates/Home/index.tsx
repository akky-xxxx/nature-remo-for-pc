// import node_modules
import React from "react"
import { Table, Spin } from "antd"
import "antd/dist/antd.css"

// import others
import { useHome } from "./modules/useHome"

// main
export const Home = () => {
  const {
    appliances,
    applianceColumns,
    isLoading,
    DraggableAppliances,
    DraggableAppliance,
    expandedRowRender,
  } = useHome()

  return (
    <Spin spinning={isLoading} size="large">
      <div>
        {/* TODO: 並び替えが sp app に反映されたらコメントアウト解除 */}
        {/* <button type="button" onClick={handleSaveAppliancesOrder}> */}
        {/*  save appliances order */}
        {/* </button> */}
      </div>

      <Table
        dataSource={appliances}
        pagination={false}
        columns={applianceColumns}
        expandable={{ expandedRowRender, expandIconColumnIndex: 1 }}
        components={{
          body: {
            wrapper: DraggableAppliances,
            row: DraggableAppliance,
          },
        }}
      />
    </Spin>
  )
}
