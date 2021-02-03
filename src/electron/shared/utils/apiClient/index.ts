// import node_modules
import axios from "axios"
import isDev from "electron-is-dev"
import dotenv from "dotenv"

// import others
import { DotEnv } from "../../const/DotEnv"

// main
dotenv.config(DotEnv.CONFIG_OPTIONS)

const prodEndpoint = "https://api.nature.global"
const devEndpoint = "http://localhost:3001"
const endpoint = isDev ? devEndpoint : prodEndpoint
export const apiClient = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Bearer ${process.env.NATURE_TOKEN}`,
  },
})
