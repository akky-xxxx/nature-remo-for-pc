const { Router } = require("express")
const { appliances } = require("../responses/appliances")
const controllers = Router()

controllers.get("/appliances", (_req, res) => {
  res.json(appliances)
})
controllers.post("/appliances", (req, res) => {
  const {
    body: { appliances },
  } = req
  console.log(appliances)
  res.json(true)
})
controllers.post("/appliances/:appliancesId", (req, res) => {
  const {
    body: { image, nickname },
    params: { appliancesId },
  } = req
  console.log({ appliancesId, image, nickname })
  res.json(true)
})
controllers.post("/appliances/:appliancesId/signal_order", (req, res) => {
  const {
    body: { signals },
    params: { appliancesId },
  } = req
  console.log({ appliancesId, signals })
  res.json(true)
})
controllers.post("/signals/:signalId", (req, res) => {
  const {
    body: { image, name },
    params: { signalId },
  } = req
  console.log({ signalId, image, name })
  res.json(true)
})

exports.controllers = controllers
