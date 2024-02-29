const mongoose = require('mongoose')

const cSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    count: {
        type: Number
    },
    date: {
        type: Date

    }
})


module.exports = mongoose.model('carts', cSchema)