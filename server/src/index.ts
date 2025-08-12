import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { WebSocketServer } from 'ws'
import apiRouter from './api/api.js'
import setupWss from './ws/ws.js'

dotenv.config();
const PORT = process.env['PORT']

const app = express()

app.use(express.json())
app.use('/api', apiRouter)

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

setupWss(wss)
server.listen(PORT, () => console.log(`Server running on ${PORT}`))
