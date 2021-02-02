// import node_modules
import { IpcMain } from "electron"

// main
export type Listener = Parameters<IpcMain["on"]>[1]
