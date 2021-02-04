// import node_modules
import log from "electron-log"

// import
import { Listener } from "../../shared/types/electron"
import { Appliance } from "../../shared/types/api"
import { Channels } from "../../shared/const/Channels"
import { Endpoints } from "../../shared/const/Endpoints"
import { apiClient } from "../../shared/utils/apiClient"

// main
const listener: Listener = async (event, appliances: Appliance[]) => {
  const requestData = {
    appliances: appliances.map((appliance) => appliance.id).join(","),
  } as const
  try {
    await apiClient.post<Appliance[]>(
      Endpoints.POST_APPLIANCE_ORDER,
      requestData,
    )
    event.sender.send(Channels.PUT_APPLIANCES, true)
  } catch (error) {
    log.error(error)
  }
}

export const putAppliances = [Channels.PUT_APPLIANCES, listener] as const
