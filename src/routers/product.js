const express = require('express')
const products = require('../usecases/products')
const upload = require('../libs/multer')
const isAuthorization = require('../middlewares/authorization')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const router = express.Router() 

const URL_BASE = process.env.URL_BASE

// disponible para usuarios y administradores
router.get('/', async (req, res) => {
    try {
        const productsOrProduct = await products.getByIdOrAll()
        res.json({
            success: true,
            data: {
                products: productsOrProduct
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
    
})


// disponible para usuarios y administradores
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const productsOrProduct = await products.getByIdOrAll(id)
        res.json({
            success: true,
            data: {
                products: productsOrProduct
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
    
})


// (disponible para administradores)
router.post('/', isAuthorization, upload.single('picture'), async (req, res) => {
    try {
        const file = req.file
        if(!file) throw new Error('Por favor ingresa una imagen')
        const picture = `${URL_BASE}/static/${file.filename}`;
        const product = JSON.parse(req.body.product)
        const productCreated = await products.addProduct({...product, picture})
        res.json({
            success: true,
            data: {
                product: productCreated
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
    
})


// (disponible para administradores)
router.patch('/:id', isAuthorization, upload.single('picture'), async (req, res) => {
    try {
        console.log('request')
        console.log(req.body.product)
        const file = req.file
        const { id } = req.params
        let newData = {}
        let picture = null
        let productSend = {}
        
        if(file) picture = `${URL_BASE}/static/${file.filename}`
        if(req.body.product) newData = JSON.parse(req.body.product)
        if(!picture) productSend = {...newData, picture}
        
        productSend = newData
        const productUpdated = await products.updateById(id, productSend)
        
        res.json({
            success: true,
            data: {
                product: productUpdated
            }
        })
     } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})


// (disponible para administradores)
router.delete('/:id', isAuthorization,  async (req, res) => {
    try {
        const { id } = req.params
        await products.deleteById(id)
        res.json({
            success: true,
            data: {
                message: 'Producto eliminado'
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.post('/*', (req, res) => {
    res.json({
        error : -2, 
        description: `ruta ${req.originalUrl} con el método ${req.method} no implementada`
    })
})
router.put('/:id/*', (req, res) => {
    res.json({
        error : -2, 
        description: `ruta ${req.originalUrl} con el método ${req.method} no implementada`
    })
})
router.patch('/*', (req, res) => {
    res.json({
        error : -2, 
        description: `ruta ${req.originalUrl} con el método ${req.method} no implementada`
    })
})
router.delete('/:id/*', (req, res) => {
    res.json({
        error : -2, 
        description: `ruta ${req.originalUrl} con el método ${req.method} no implementada`
    })
})
router.get('/:id/*', (req, res) => {
    res.json({
        error : -2, 
        description: `ruta ${req.originalUrl} con el método ${req.method} no implementada`
    })
})


module.exports = router