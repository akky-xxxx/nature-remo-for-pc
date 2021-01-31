const express = require("express")
const { controllers } = require("./controllers")

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use("/1", controllers)

server.listen(3001)
