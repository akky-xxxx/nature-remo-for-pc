// import node_modules
import React, { useEffect, useState } from "react"
import { List, Card, Collapse } from "antd"
import "antd/dist/antd.css"

// import others
import { Channels } from "../shared/const/Channels"
import { Appliance } from "../shared/types/api"

// main
const { GET_APPLIANCES } = Channels
const { Panel } = Collapse

const IndexPage = () => {
  const [data, setData] = useState<Appliance[]>([])

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

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(appliance) => (
          <List.Item>
            <Card title={appliance.nickname}>
              {Boolean(appliance.signals.length) && (
                <Collapse>
                  <Panel header="signal" key={appliance.id}>
                    {appliance.signals.map((signal) => (
                      <div key={signal.id}>{signal.name}</div>
                    ))}
                  </Panel>
                </Collapse>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default IndexPage
