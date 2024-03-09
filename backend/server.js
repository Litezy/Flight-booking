const env = require('dotenv')

env.config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()
const server =http.createServer(app)
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176']
}))


app.use('/api/user', require('./routes/UserRoutes'))
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})