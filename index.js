const express = require('express')
const productRouter = require('./src/routers/product')
const cartRouter = require('./src/routers/cart')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static',express.static('uploads'))



app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

// app.use('/api', (req, res) => {
//     res.json({
//         message: 'Welcome'
//     })
// })


app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`)
})