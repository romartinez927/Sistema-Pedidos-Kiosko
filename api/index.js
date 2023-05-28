import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({path:"./api/.env"})
export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/test", (req, res) => {
    res.json({body: "hello world" + Date.now()})
})

const PORT = process.env.API_PORT || "https://deploy-test-two-rho.vercel.app"

if (PORT) {
    app.listen(PORT, console.log(`escuchando en puerto ${PORT}`))
}

