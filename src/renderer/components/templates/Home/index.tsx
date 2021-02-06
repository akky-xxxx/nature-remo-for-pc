// import node_modules
import React from "react"
import { Table, Form } from "antd"
import "antd/dist/antd.css"

// import others
import { useHome } from "./modules/useHome"

// main
export const Home = () => {
  const {
    appliances,
    applianceColumns,
    DraggableAppliances,
    DraggableAppliance,
    expandedRowRender,
  } = useHome()

  return (
    <div>
      <div>
        {/* TODO: 並び替えが sp app に反映されたらコメントアウト解除 */}
        {/* <button type="button" onClick={handleSaveAppliancesOrder}> */}
        {/*  save appliances order */}
        {/* </button> */}
      </div>

      <Form>
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
      </Form>
    </div>
  )
}
