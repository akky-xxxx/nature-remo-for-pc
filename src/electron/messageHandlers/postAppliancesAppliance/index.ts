// import node_modules
import log from "electron-log"
import FormData from "form-data"

// import
import { Listener } from "../../shared/types/electron"
import { Appliance } from "../../shared/types/api"
import { Channels } from "../../shared/const/Channels"
import { Endpoints } from "../../shared/const/Endpoints"
import { apiClient } from "../../shared/utils/apiClient"

// main
const listener: Listener = async (
  event,
  appliances: Omit<Appliance, "signals">,
) => {
  const { id, image, nickname } = appliances
  console.log(appliances)
  const endpoint = Endpoints.POST_APPLIANCES_APPLIANCE.replace("{:applianceId}", id)
  const formData = new FormData()
  formData.append("nickname", nickname)
  formData.append("image", image)
  try {
    await apiClient.post<Appliance[]>(endpoint, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    event.sender.send(Channels.POST_APPLIANCES_APPLIANCE, true)
  } catch (error) {
    log.error(error)
  }
}

export const postAppliancesAppliance = [
  Channels.POST_APPLIANCES_APPLIANCE,
  listener,
] as const
