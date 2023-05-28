import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({path:"./api/.env"})
const app = express()

app.use(cors())
app.get("/api/test", (req, res) => {
    res.json({body: "hello world" + Date.now()})
})

const PORT = process.env.API_PORT

if (PORT) {
    app.listen(PORT, console.log(`escuchando en puerto ${PORT}`))
}

export default { app }