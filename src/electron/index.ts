// import node_modules
import { join } from "path"
import { format } from "url"
import { BrowserWindow, app, ipcMain } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"
import log from "electron-log"

// import listeners
import { getAppliances } from "./messageHandlers/getAppliances"

// main
app.on("ready", async () => {
  await prepareNext("./src/renderer")

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
    },
  })
  if (isDev) mainWindow.webContents.openDevTools()

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../src/renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit)

ipcMain.on(...getAppliances)

process.on("uncaughtException", (err) => {
  log.error("electron:event:uncaughtException")
  log.error(err)
  log.error(err.stack)
  app.quit()
})
