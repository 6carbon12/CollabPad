import http from 'http'
import https from 'https'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { WebSocketServer } from 'ws'
import fs from 'fs'
import apiRouter from './api/api.js'
import setupWss from './ws/ws.js'

dotenv.config();
const PORT = Number(process.env['PORT'])

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', apiRouter)

const creds = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

const httpServer = http.createServer(app)
const httpsServer = https.createServer(creds, app)
const wss = new WebSocketServer({ server: httpServer })

setupWss(wss)
httpServer.listen(PORT, () => console.log(`HTTP @ ${PORT}`))
httpsServer.listen(PORT + 1, () => console.log(`HTTPS @ ${PORT + 1}`))
