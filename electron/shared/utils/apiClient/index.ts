// import node_modules
import axios from "axios"
import isDev from "electron-is-dev"

// main
const prodEndpoint = "https://api.nature.global"
const devEndpoint = "http://localhost:3001"
const endpoint = isDev ? devEndpoint : prodEndpoint
export const apiClient = axios.create({ baseURL: endpoint })
