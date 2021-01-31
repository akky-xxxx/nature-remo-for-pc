import React, { useEffect } from "react"
import Link from "next/link"
import Layout from "../components/Layout"

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
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1>Hello Next.js 👋</h1>
      <button type="button" onClick={onSayHiClick}>
        Say hi to electron
      </button>
      <p>
        <Link href="/about">About</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
