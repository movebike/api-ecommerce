const { v4: uuidv4 } = require('uuid')

class Cart {
    constructor (products) {
        this.id = uuidv4()
        this.timestamp = Date.now()
        this.products = products
    }
}

module.exports = Cart