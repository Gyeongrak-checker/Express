const mongoose = require('mongoose');
const { Schema } = mongoose;

const smallSchema = new Schema({
    name: { type: String },
    code: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Mid' },
});

const midSchema = new Schema({
    name: { type: String },
    code: { type: String },
    large: { type: mongoose.Schema.Types.ObjectId, ref: 'Large' },
});

const productSchema = new Schema({
    name: { type: String },
    code: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Products = mongoose.model('Product', productSchema);

module.exports = {
    Products,
};
