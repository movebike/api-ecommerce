const express = require('express')
const cors = require('cors')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/static',express.static('uploads'))



app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

module.exports = app