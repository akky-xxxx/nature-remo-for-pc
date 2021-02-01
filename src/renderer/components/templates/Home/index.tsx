// import node_modules
import React from "react"
import { Table, Form, Input } from "antd"
import "antd/dist/antd.css"

// import components
import { DragHandle } from "./components/atoms/DragHandle"

// import others
import { useHome } from "./modules/useHome"

// main

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
    render: (nickname: string) => (
      <Form.Item rules={[{ required: true }]}>
        <Input value={nickname} />
      </Form.Item>
    ),
  },
]

export const Home = () => {
  const { data, DraggableWrapper, DraggableBodyRow, onSayHiClick } = useHome()

  return (
    <div>
      <div>
        <button type="button" onClick={onSayHiClick}>
          get appliances
        </button>
      </div>

      <Form>
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
      </Form>
    </div>
  )
}
