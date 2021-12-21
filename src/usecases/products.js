const fs = require('fs')
const Product = require('../models/product') 
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const URL_BASE = process.env.URL_BASE

class ProductCases {
    constructor(file){
        this.file = file
    }

    static async getProducts (file) {
        try {
            let content
            if(!file) content = await fs.promises.readFile(this.file, 'utf-8')
            content = await fs.promises.readFile(file, 'utf-8')
            if(content) {
                const products = JSON.parse(content)
                return products
            }
            return null
        } catch (error) {
            // await fs.promises.writeFile(file, '[]')
            throw new Error(error)
        }
    }

    async getByIdOrAll(id) {
        try {
            const products = await ProductCases.getProducts(this.file)
            if(!id) return products
            const productFound = products.find(product => product.id === id)
            if(!productFound) throw new Error('No existe el producto')
            return productFound
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(productToCreate) {
        try {
            if(!productToCreate) throw new Error('No enviaste datos para guardar')
            let products = await ProductCases.getProducts(this.file)
            const {name, description, code, price, stock, picture} = productToCreate
            const productCreated = new Product(name, description, code, price, stock, picture)
            products = [...products, productCreated]
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return productCreated
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, newData) {
        try {
            const products = await ProductCases.getProducts(this.file)
            const productToUpdate = products.find(product => product.id === id)
            if(!productToUpdate) throw new Error('El producto no existe')
            console.log(newData)
            if(newData.picture) {
                let nameImageNew = newData.picture.split(`${URL_BASE}/static/`)[1]
                let nameImageOld = null
                if(productToUpdate.picture) {
                    const { picture: oldPicture } = productToUpdate
                    nameImageOld = oldPicture.split(`${URL_BASE}/static/`)[1]
                }
                if(nameImageOld) {
                    if( nameImageNew  !== nameImageOld)  await fs.promises.unlink(`uploads/${nameImageOld}`)
                }
            }
            const indexProduct = products.findIndex(product => product.id === id);
            const productUpdated = {...productToUpdate,...newData}
            products.splice(indexProduct, 1, productUpdated)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return productUpdated
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id){
        // Elimna del archivo el objeto con el id
        try {
            const products = await ProductCases.getProducts(this.file)
            const productToDelete = products.find(product => product.id === id)
            if(!productToDelete) throw new Error('El producto no existe')
            const newProducts = products.filter(product => product.id !== id)
            const { picture } = productToDelete
            // console.log(picture.split('https://products-rest-multer.herokuapp.com/static/')[1])
            await fs.promises.unlink(`uploads/${picture.split(`${URL_BASE}/static/`)[1]}`)
            await fs.promises.writeFile(this.file, JSON.stringify(newProducts, null, 2))
            return 'Producto Eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteAll(){
        // Elimina todos los objetos del archivo
        try {
            const products = await ProductCases.getProducts(this.file)
            products.splice(0, products.length)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
        } catch (error) {
            throw new Error(error)
        }
    }
}

const products = new ProductCases(`./data/products.json`)

module.exports = products