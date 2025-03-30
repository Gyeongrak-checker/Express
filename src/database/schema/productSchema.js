const mongoose = require('mongoose');
const { Schema } = mongoose;

// Large Schema (최상위 카테고리)
const largeSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, uinque: true },
});

// Mid Schema (Large를 참조)
const midSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, uinque: true },
    large: { type: mongoose.Schema.Types.ObjectId, ref: 'Large' },
});

// Product Schema (Mid을 참조)
const productSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, uinque: true },
    mid: { type: mongoose.Schema.Types.ObjectId, ref: 'Mid' },
});

largeSchema.index({ code: 1 });
midSchema.index({ code: 1 });
productSchema.index({ code: 1 });

const Large = mongoose.model('Large', largeSchema);
const Mid = mongoose.model('Mid', midSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = {
    Large,
    Mid,
    Product,
};
