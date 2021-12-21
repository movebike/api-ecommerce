const express = require('express')

const router = express.Router()

// Crea un carrito y devuelve su id.
router.post('/', (req, res) => {
    res.json({
        message: 'crear carrito'
    })
})

// Vacía un carrito y lo elimina.
router.delete('/:id', (req, res) => {
    res.json({
        message: 'borrar carrito'
    })
})

// Me permite listar todos los productos guardados en el carrito
router.get('/:id/products', (req, res) => {
    res.json({
        message: 'productos del carrito'
    })
})

// Para incorporar productos al carrito por su id de producto
router.post('/:id/products', (req, res) => {
    res.json({
        message: 'agregar productos en el carrito'
    })
})

router.delete('/:id/products/:id_product', (req, res) => {
    res.json({
        message: 'borrar un producto de un carrito'
    })
})


module.exports = router