import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { conectar } from "../database/mongoose.js"
import { apiRouter } from "../routers/api.router.js"

conectar()

dotenv.config({path:"./api/.env"})
export const app = express()

app.use(cors())
app.use(express.static("public"))

app.use("/api", apiRouter)

const PORT = 4000 || "https://deploy-test-two-rho.vercel.app"

if (PORT) {
    app.listen(PORT, console.log(`escuchando en puerto ${PORT}`))
}

