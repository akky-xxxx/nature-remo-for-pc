// import node_modules
import log from "electron-log"
import FormData from "form-data"

// import
import { Listener } from "../../shared/types/electron"
import { Signal } from "../../shared/types/api"
import { Channels } from "../../shared/const/Channels"
import { Endpoints } from "../../shared/const/Endpoints"
import { apiClient } from "../../shared/utils/apiClient"

// main
const listener: Listener = async (event, signal: Signal) => {
  const { id, image, name } = signal
  const endpoint = Endpoints.POST_SIGNALS_SIGNAL.replace("{:signalId}", id)
  const formData = new FormData()
  formData.append("name", name)
  formData.append("image", image)
  try {
    await apiClient.post(endpoint, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    event.sender.send(Channels.POST_SIGNALS_SIGNAL, true)
  } catch (error) {
    log.error(error)
  }
}

export const postSignalsSignal = [
  Channels.POST_SIGNALS_SIGNAL,
  listener,
] as const
