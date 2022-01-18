const ContainerProduct = require('../../containers/file/ProductsFile')

class ProductDao extends ContainerProduct {

    constructor() {
        super('./data/products.json')
    }

    addProduct(product) {
        return super.addProduct(product)
    }

    getByIdOrAll(id) {
        return super.getByIdOrAll(id)
    }

    updateById(id, newData) {
        return super.updateById(id, newData)
    }

    deleteById(id) {
        return super.deleteById(id)
    }

    deleteAll() {
        return super.deleteAll()
    }

}

module.exports = ProductDao