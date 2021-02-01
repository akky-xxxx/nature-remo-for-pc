// import
import { Listener } from "../../shared/types/electron"
import { Appliance } from "../../shared/types/api"
import { Channels } from "../../shared/const/Channels"
import { Endpoints } from "../../shared/const/Endpoints"
import { apiClient } from "../../shared/utils/apiClient"

// main
const listener: Listener = async (event) => {
  const { data } = await apiClient.get<Appliance[]>(Endpoints.GET_APPLIANCES)
  const responseData = data.map((item) => ({
    key: item.id,
    ...item,
  }))
  event.sender.send(Channels.GET_APPLIANCES, responseData)
}

export const getAppliances = [Channels.GET_APPLIANCES, listener] as const
