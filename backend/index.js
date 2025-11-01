import express from "express"
import http from "http"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const server = http.createServer(app)

dotenv.config()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

server.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`)
})