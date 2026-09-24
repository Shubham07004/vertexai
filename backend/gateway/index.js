import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import proxy from "express-http-proxy"
import { protect } from "./middleware/protect.js"
import { getCurrentUser } from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import http from "http"
import httpProxy from "http-proxy"
const port = process.env.PORT || 8000

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())
app.use(morgan("dev"))
const server = http.createServer(app)
app.use("/api/auth", proxy(process.env.AUTH_SERVICE || "http://localhost:8001"))
app.use("/api/project", protect, proxyWithHeader(process.env.PROJECT_SERVICE || "http://localhost:8002"))
app.use("/api/file", protect, proxyWithHeader(process.env.FILE_SERVICE || "http://localhost:8003"))
app.use("/api/ai", protect, proxyWithHeader(process.env.AI_SERVICE || "http://localhost:8004"))
app.use("/api/terminal", protect, proxy(process.env.TERMINAL_SERVICE || "http://localhost:8005"))
app.use("/api/payment", protect, proxyWithHeader(process.env.PAYMENT_SERVICE || "http://localhost:8006"))
app.get("/api/me", protect, getCurrentUser)

app.get("/", (req, res) => {
    res.json({ "message": "hello from gateway" })
})

const socketProxy=httpProxy.createProxyServer({
    target:process.env.TERMINAL_SERVICE || "http://localhost:8005",
    ws:true
})

app.use("/socket.io",(req,res)=>{
   socketProxy.web(req,res,{
      target:process.env.TERMINAL_SERVICE || "http://localhost:8005"
   })
})

server.on("upgrade",(req,socket,head)=>{
    if(req.url.startsWith("/socket.io")){
        socketProxy.ws(req,socket,head,{
            target:process.env.TERMINAL_SERVICE || "http://localhost:8005"
        })
    }
})




server.listen(port,"0.0.0.0",() => {
    console.log(`gateway started at ${port}`)
})