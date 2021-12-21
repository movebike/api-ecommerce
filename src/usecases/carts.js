const fs = require('fs')
const Cart = require('../models/cart')
// const ProductCases = require('../usecases/products')
const productsCases =  require('../usecases/products')

class CartCases {
    constructor(file){
        this.file = file
    }

    static async getCarts (file) {
        try {
            const content = await fs.promises.readFile(file, 'utf-8')
            if(content) {
                const carts = JSON.parse(content)
                return carts
            }
            return null
        } catch (error) {
            // await fs.promises.writeFile(file, '[]')
            throw new Error(error)
        }
    }

    async create(data) {
        try {
            if(!data.products) throw new Error('No enviaste datos para guardar')
            const { products } = data
            let carts = await CartCases.getCarts(this.file)

            const allProducts = await productsCases.getByIdOrAll()
            const productFound = allProducts.find(product => product.id === products[0].id)
            if(!productFound) throw new Error('El producto no existe')
            if(productFound.stock <= 0 ) throw new Error('No hay suficiente stock de este producto')
            
            await productsCases.updateById(productFound.id, { stock: productFound.stock - 1 })
            
            const cartCreated = new Cart(products)

            carts = [...carts, cartCreated]
            await fs.promises.writeFile(this.file, JSON.stringify(carts, null, 2))
            return cartCreated.id
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteCartById(id) {
        try {
            let carts = await CartCases.getCarts(this.file)
            const cartFound = carts.find(cart => cart.id === id)
            if(!cartFound) throw new Error('No existe el carrito')
            const cartsFiltered = carts.filter(cart => cart.id !== id)
            await fs.promises.writeFile(this.file, JSON.stringify(cartsFiltered, null, 2))
            return 'Carrito eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductsByCart(idCart) {
        try {
            let carts = await CartCases.getCarts(this.file)
            const cartFound = carts.find(cart => cart.id === idCart)
            if(!cartFound) throw new Error('No existe el carrito')
            return cartFound.products
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(idCart, idProduct) {
        try {
            let carts = await CartCases.getCarts(this.file)
            const cartFound = carts.find(cart => cart.id === idCart)
            if(!cartFound) throw new Error('No existe el carrito')
            
            const allProducts = await productsCases.getByIdOrAll()
            const productFound = allProducts.find(product => product.id === idProduct)
            if(!productFound) throw new Error('El producto no existe')
            if(productFound.stock <= 0 ) throw new Error('No hay suficiente stock de este producto')
            
            await productsCases.updateById(productFound.id, { stock: productFound.stock - 1 })

            cartFound.products.push(productFound)
            const cartsFiltered = carts.filter(cart => cart.id !== idCart)
            cartsFiltered.push(cartFound)
            
            
            await fs.promises.writeFile(this.file, JSON.stringify(cartsFiltered, null, 2))
            return 'Producto agregado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProductByCart(idCart, idProduct) {
        try {
            let carts = await CartCases.getCarts(this.file)
            const cartFound = carts.find(cart => cart.id === idCart)
            if(!cartFound) throw new Error('No existe el carrito')

            const productsCarts = cartFound.products
            const productFound = productsCarts.find(product => product.id === idProduct)
            if(!productFound) throw new Error('El producto no existe en el carrito')

            const productsFiltered = productsCarts.filter(cart => cart.id !== idProduct)
            cartFound.products = productsFiltered

            const cartsFiltered = carts.filter(cart => cart.id !== idCart)
            cartsFiltered.push(cartFound)
            await fs.promises.writeFile(this.file, JSON.stringify(cartsFiltered, null, 2))
            return 'Producto eliminado del carrito'
        } catch (error) {
            throw new Error(error)
        }
    }

}

const carts = new CartCases('./data/carts.json')

module.exports = carts