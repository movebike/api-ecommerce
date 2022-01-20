
const ProductDaoFile = require('./Daos/file/Products')
const CartDaoFile = require('./Daos/file/Carts')

const ProductDaoMongo = require('./Daos/mongo/Products')
const CartDaoMongo = require('./Daos/mongo/Carts')

const ProductFirebase = require('./Daos/firebase/Products')
const CartFirebase = require('./Daos/firebase/Carts')

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
    case 'firebase':
            ProductDao = new ProductFirebase()
            CartDao = new CartFirebase()
    default:
        break;
}

module.exports = {
    ProductDao,
    CartDao
}