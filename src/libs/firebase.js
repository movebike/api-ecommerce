
const admin = require("firebase-admin");



function getDatabase () {
    const serviceAccount = require("./ecommerce-e13c7-firebase-adminsdk-sqn7e-b75dd92ee7.json");
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ecommerce-e13c7.firebaseio.com'
    });
    console.log('Database initialized')
    // retorno la base de datos
    return admin.firestore()
}

// para hacer referencia a una collection
// query = db.collection('products')

// llamar a un doc
// collection = query.doc()

// CREATE
// create a new document
// await collection.create({name: 'Product 2'})

// GET ALL

// const querySnapshop = await query.get()
// let docs = querySnapshop.docs()

// response = docs.map(doc => ({
//     name: doc.data().name
// }))

// GET By ID

// let id = 'someid'
// const register = query.doc(id)
// const item = await register.get()
// dato = item.data()

// UPDATE

// const docUpdate = query.doc(id)
// const itemUpdated = await docUpdate.update({newField = 'hi'})

// DELETE

// const docForDelete = query.doc(id)
// const itemDeleted = await docForDelete.delete()


module.exports = getDatabase