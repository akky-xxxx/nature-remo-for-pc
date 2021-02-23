// import node_modules
import React, { ChangeEventHandler, FC, Fragment, useState } from "react"
import { Button, Input, Row, Col } from "antd"

import { Channels } from "../../../../../../shared/const/Channels"

// main
const { POST_APPLIANCES_APPLIANCE } = Channels
type ApplianceRecordProps = {
  id: string
  nickname: string
  image: string
  handleShowSpinner: () => void
}
export const ApplianceRecord: FC<ApplianceRecordProps> = (props) => {
  const { nickname, id, image, handleShowSpinner } = props
  const [thisNickname, setThisNickname] = useState(nickname)
  const handleChangeNickname: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const {
      target: { value },
    } = event
    setThisNickname(value)
  }
  const requestData = { id, image, nickname: thisNickname }
  const handleSaveAppliancesName = () => {
    handleShowSpinner()
    global.ipcRenderer.send(POST_APPLIANCES_APPLIANCE, requestData)
  }

  return (
    <Fragment>
      <Row>
        <Col flex="70">
          <Input value={thisNickname} onChange={handleChangeNickname} />
        </Col>
        <Col flex="auto">
          <Button
            type="primary"
            disabled={!thisNickname.length}
            onClick={handleSaveAppliancesName}
          >
            保存
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}
