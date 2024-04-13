require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConfig')
const { logger } = require('./middleware/logEvents')
const credentials = require('./middleware/credentials')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const app = express()
const PORT = process.env.PORT || 3500

// Connect to DB
connectDB()

// Custom middleware logger
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// routes
app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
  res.status(404)
})

mongoose.connection.once('open', () => {
  console.log('Connected to DB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
