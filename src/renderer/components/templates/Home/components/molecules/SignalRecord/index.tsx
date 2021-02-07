// import node_modules
import React, { ChangeEventHandler, FC, Fragment, useState } from "react"
import { Button, Input, Row, Col } from "antd"

import { Channels } from "../../../../../../shared/const/Channels"

// main
const { POST_SIGNALS_SIGNAL } = Channels
type SignalRecordProps = {
  id: string
  name: string
  image: string
}
export const SignalRecord: FC<SignalRecordProps> = (props) => {
  const { name, id, image } = props
  const [thisName, setThisNickname] = useState(name)
  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event
    setThisNickname(value)
  }
  const requestData = { id, image, name: thisName }
  const handleSaveSignalName = () => {
    global.ipcRenderer.send(POST_SIGNALS_SIGNAL, requestData)
  }

  return (
    <Fragment>
      <Row>
        <Col flex="70">
          <Input value={thisName} onChange={handleChangeName} />
        </Col>
        <Col flex="auto">
          <Button
            type="primary"
            disabled={!thisName.length}
            onClick={handleSaveSignalName}
          >
            保存
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}
