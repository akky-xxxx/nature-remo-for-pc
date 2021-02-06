// import node_modules
import React, { ChangeEventHandler, FC, Fragment, useState } from "react"
import { Button, Input } from "antd"

import { Channels } from "../../../../../../shared/const/Channels"

// main
const { POST_APPLIANCES_APPLIANCE } = Channels
type ApplianceRecordProps = {
  id: string
  nickname: string
  image: string
}
export const ApplianceRecord: FC<ApplianceRecordProps> = (props) => {
  const { nickname, id, image } = props
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
    global.ipcRenderer.send(POST_APPLIANCES_APPLIANCE, requestData)
  }

  return (
    <Fragment>
      <Input value={thisNickname} onChange={handleChangeNickname} />
      <Button onClick={handleSaveAppliancesName}>保存</Button>
    </Fragment>
  )
}
