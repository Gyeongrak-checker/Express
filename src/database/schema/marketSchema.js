const mongoose = require('mongoose');
const { Schema } = mongoose;

const comporate = {
    code: { type: Number },
    name: { type: String },
};

const marketSchema = new Schema({
    name: { type: String, require: true },
    code: { type: Number, require: true },
    comporate: [comporate],
    createdAt: { type: Date, default: Date.now, expires: '1d' },
});

const Market = mongoose.model('Market', marketSchema);

module.exports = {
    Market,
};
