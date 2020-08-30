const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

const itemRoutes = require('./items/itemRoute')
const categoryRoutes = require('./categories/categoryRoute')
const shopRoutes = require('./shops/shopRoute')
const cartRoutes = require('./cart/cartRoute')
const userRoutes = require('./users/userRouter')

app.use(cors())
app.use(express.json())

app.use('/items', itemRoutes)
app.use('/categories', categoryRoutes)
app.use('/shops', shopRoutes)
app.use('/cart', cartRoutes)
app.use('/user', userRoutes)

app.listen(port, () => console.log(`listening on port ${port}`))
