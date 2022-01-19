const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
   name: {
       type: String
   },
   description: {
       type: String
   },
   code: {
       type: String
   },
   picture: {
       type: String
   },
   price: {
       type: Number
   },
   stock: {
       type: Number,
       default: 0
   },
   lastRode: {
       type: Number
   },
   speed: {
       type: Number
   },
   limit: {
       type: Number
   }
}, {
    timestamps: true
})

module.exports = ProductSchema