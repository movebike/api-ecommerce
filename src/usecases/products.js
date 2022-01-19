const fs = require('fs')
const Product = require('../models/file/product') 
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const {ProductDao} = require('../SelectSourceData/index')

class ProductCases {

    async getByIdOrAll(id) {
        try {
            const productFound = await ProductDao.getByIdOrAll(id)
            return productFound
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(productToCreate) {
        try {
            const productCreated = await ProductDao.addProduct(productToCreate)
            return productCreated
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, newData) {
        try {
            productUpdated = await ProductDao.updateById(id, newData)
            return productUpdated
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id){
        // Elimna del archivo el objeto con el id
        try {
            await ProductDao.deleteById(id)
            return 'Producto Eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteAll(){
        // Elimina todos los objetos del archivo
        try {
            await ProductDao.deleteAll()
        } catch (error) {
            throw new Error(error)
        }
    }
}

const products = new ProductCases()

module.exports = products