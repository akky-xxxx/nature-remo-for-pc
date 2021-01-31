import React, { useEffect } from "react"
import Link from "next/link"

const IndexPage = () => {
  useEffect(() => {
    // add a listener to 'message' channel
    global.ipcRenderer.addListener("message", (_event, args) => {
      // eslint-disable-next-line no-alert
      window.alert(args)
    })
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send("message", "hi from next")
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
