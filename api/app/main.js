import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { conectar } from "../database/mongoose.js"
import { apiRouter } from "../routers/api.router.js"
import { Server as SocketIOServer } from "socket.io"

conectar()

dotenv.config({path:"./api/.env"})
export const app = express()

app.use(cors())
app.use(express.static("public"))

const PORT = 4000
const httpServer = app.listen(PORT)

const io = new SocketIOServer(httpServer, {
    cors: {
        origin: "https://deluxe-lolly-660eac.netlify.app",
        methods: ["GET", "POST"]
    }
})

io.on("connection", async clientSocket => {
    console.log(`Usuario conectado ${clientSocket.id}`)
    clientSocket.on("send_message", (data) => {
        clientSocket.broadcast.emit("enviar_estado", data)
    })

    clientSocket.on("send_prueba", (data) => {
        const prueba = data.message
        console.log(prueba)
        clientSocket.broadcast.emit("enviar_prueba", prueba)
    })
})

app.use("/api", apiRouter)

console.log(`Escuchando en port ${PORT}`)

