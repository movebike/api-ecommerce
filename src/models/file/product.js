const { v4: uuidv4 } = require('uuid')

class Product {

    // id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
    constructor(name, description, code, price, stock, lastRode, speed, limit, picture) {
        this.id = uuidv4()
        this.name = name
        this.description = description
        this.code = code
        this.picture = picture
        this.price = price
        this.stock = stock
        this.lastRode = lastRode
        this.speed = speed
        this.limit = limit
        this.timestamp = Date.now()
    }
}

module.exports = Product