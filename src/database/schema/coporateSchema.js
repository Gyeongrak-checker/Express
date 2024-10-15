const mongoose = require('mongoose');
const { Schema } = mongoose;

const coporateSchema = new Schema({
    code: {type: Number},
    name: {type: String},
    createdAt: { type: Date, default: Date.now, expires: '7d' },
});

const Coporate = mongoose.model('Coporates', coporateSchema);

module.exports = {
    Coporate,
}