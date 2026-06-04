import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDB } from './db/index.js'

import novelsRouter from './routes/novels.js'
import chaptersRouter from './routes/chapters.js'
import usersRouter from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Database Tables
initDB()

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '5mb' }))

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/api/novels', novelsRouter)
app.use('/api/chapters', chaptersRouter)
app.use('/api/users', usersRouter)

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`FictionOS API running on http://localhost:${PORT}`)
})
