
const ProductDaoFile = require('./Daos/file/Products')
const CartDaoFile = require('./Daos/file/Carts')

const ProductDaoMongo = require('./Daos/mongo/Products')
const CartDaoMongo = require('./Daos/mongo/Carts')

let ProductDao
let CartDao

switch (process.env.SOURCE_DATA) {
    case 'file':
        ProductDao = new ProductDaoFile()
        CartDao = new CartDaoFile()
        break;
    case 'mongo':
        ProductDao = new ProductDaoMongo()
        CartDao = new CartDaoMongo()
    default:
        break;
}

module.exports = {
    ProductDao,
    CartDao
}