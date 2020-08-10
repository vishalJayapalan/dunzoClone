const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

const itemRoutes = require('./items/itemRoutes')
const categoryRoutes = require('./categories/categoryRoutes')
const shopRoutes = require('./shops/shopRoutes')

app.use(cors())
app.use(express.json())

app.use('/items', itemRoutes)
app.use('/categories', categoryRoutes)
app.use('/shops', shopRoutes)

app.listen(port, () => console.log(`listening on port ${port}`))
