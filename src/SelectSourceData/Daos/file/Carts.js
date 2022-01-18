const ContainerCarts = require('../../containers/file/CartsFile')

class CartDaoFile extends ContainerCarts {
    constructor() {
        super('./data/carts.json')
    } 

    create (data) {
        return super.create(data)
    }

    deleteCartById(id) {
        return super.deleteCartById(id)
    }

    getProductsByCart(idCart) {
        return super.getProductsByCart(idCart)
    }

    addProductToCart(idCart, idProduct) {
        return super.addProductToCart(idCart, idProduct)
    }

    deleteProductByCart(idCart, idProduct) {
        return super.deleteProductByCart(idCart, idProduct)
    }
}

module.exports = CartDaoFile