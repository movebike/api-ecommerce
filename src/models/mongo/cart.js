const mongoose = require('mongoose')
const ProductSchema = require('./product')

const CartSchema = new mongoose.Schema({
    products : [ProductSchema]
}, {
    timestamps: true
})

module.exports = CartSchema