// import node_modules
import log from "electron-log"

// import
import { Listener } from "../../shared/types/electron"
import { Appliance } from "../../shared/types/api"
import { Channels } from "../../shared/const/Channels"
import { Endpoints } from "../../shared/const/Endpoints"
import { apiClient } from "../../shared/utils/apiClient"

// main
const listener: Listener = async (event) => {
  try {
    const { data } = await apiClient.get<Appliance[]>(Endpoints.GET_APPLIANCES)
    const responseData = data.map((item, index) => ({
      ...item,
      key: item.id,
      index,
      signals: item.signals.map((signal, index2) => ({
        ...signal,
        index: index2,
      })),
    }))
    event.sender.send(Channels.GET_APPLIANCES, responseData)
  } catch (error) {
    log.error(error)
    event.sender.send(Channels.GET_APPLIANCES, false)
  }
}

export const getAppliances = [Channels.GET_APPLIANCES, listener] as const
