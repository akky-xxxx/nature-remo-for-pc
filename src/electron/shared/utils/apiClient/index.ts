// import node_modules
import axios from "axios"
import isDev from "electron-is-dev"
import dotenv from "dotenv"
import { resolve } from "path"

// main
dotenv.config({ path: resolve(__dirname, "../../../../.env") })

const prodEndpoint = "https://api.nature.global"
const devEndpoint = "http://localhost:3001"
const endpoint = isDev ? devEndpoint : prodEndpoint
export const apiClient = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Bearer ${process.env.NATURE_REMO_TOKEN}`,
  },
})
