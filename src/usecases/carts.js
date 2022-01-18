const { CartDao } = require('../SelectSourceData/index')

class CartCases {

    async create(data) {
        try {
            const id = await CartDao.create(data)
            return id
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteCartById(id) {
        try {
            await CartDao.deleteCartById(id)
            return 'Carrito eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductsByCart(idCart) {
        try {
            const products = await CartDao.getProductsByCart(idCart)
            return products
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(idCart, idProduct) {
        try {
            await CartDao.addProductToCart(idCart, idProduct)
            return 'Producto agregado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProductByCart(idCart, idProduct) {
        try {
            await CartDao.deleteProductByCart(idCart, idProduct)
            return 'Producto eliminado del carrito'
        } catch (error) {
            throw new Error(error)
        }
    }

}

const carts = new CartCases()

module.exports = carts