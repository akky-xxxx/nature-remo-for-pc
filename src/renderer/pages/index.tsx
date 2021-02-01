// import node_modules
import React, { useEffect } from "react"
import Link from "next/link"

// import others
import { Channels } from "../shared/const/Channels"

// main
const { GET_APPLIANCES } = Channels
const IndexPage = () => {
  useEffect(() => {
    global.ipcRenderer.on(GET_APPLIANCES, (_event, args) => {
      console.log(args)
    })
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send(GET_APPLIANCES, null)
  }

  return (
    <div>
      <h1>Hello Next.js 👋</h1>
      <button type="button" onClick={onSayHiClick}>
        Say hi to electron
      </button>
      <p>
        <Link href="/about">About</Link>
      </p>
    </div>
  )
}

export default IndexPage
