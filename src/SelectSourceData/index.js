
const ProductDaoFile = require('./Daos/file/Products')
const CartDaoFile = require('./Daos/file/Carts')

let ProductDao
let CartDao

switch (process.env.SOURCE_DATA) {
    case 'file':
        ProductDao = new ProductDaoFile()
        CartDao = new CartDaoFile()
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    CartDao
}