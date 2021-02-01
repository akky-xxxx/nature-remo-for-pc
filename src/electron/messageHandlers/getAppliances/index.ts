// import
import { Listener } from "../../shared/types/electron"
import { Channels } from "../../shared/const/Channels"
import { Endpoints } from "../../shared/const/Endpoints"
import { apiClient } from "../../shared/utils/apiClient"

// main
const listener: Listener = async (event) => {
  const { data } = await apiClient.get(Endpoints.GET_APPLIANCES)
  event.sender.send("GET:appliances", data)
}

export const getAppliances = [Channels.GET_APPLIANCES, listener] as const
