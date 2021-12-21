const { v4: uuidv4 } = require('uuid')

class Cart {
    constructor (products) {
        this.id = uuidv4()
        this.timestamp = Date.now()
        this.productos = products
    }
}

module.exports = Cart