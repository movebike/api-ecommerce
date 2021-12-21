const express = require('express')
const carts = require('../usecases/carts')

const router = express.Router()

// Crea un carrito y devuelve su id.
router.post('/', async (req, res) => {
    try {
        const { body: cart } = req
        const idCart = await carts.create(cart)
        res.json({
            success: true,
            data: {
                cart: idCart
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Vacía un carrito y lo elimina.
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await carts.deleteCartById(id)
        res.json({
            success: true,
            data: {
                message: 'Carrito eliminado'
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Me permite listar todos los productos guardados en el carrito
router.get('/:id/products', async (req, res) => {
    try {
        const idCart = req.params.id
        const allProducts = await carts.getProductsByCart(idCart)
        res.json({
            success: true,
            data: {
                products: allProducts
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Para incorporar productos al carrito por su id de producto
router.post('/:id/products/:id_product', async (req, res) => {
    try {
        const idCart = req.params.id
        const idProduct = req.params.id_product
        await carts.addProductToCart(idCart, idProduct)
        res.json({
            success: true,
            message: 'Producto agregado'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.delete('/:id/products/:id_product', async (req, res) => {
    try {
        const idCart = req.params.id
        const idProduct = req.params.id_product
        await carts.deleteProductByCart(idCart, idProduct)
        res.json({
            success: true,
            message: 'Producto eliminado'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = router