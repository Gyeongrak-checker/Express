const mongoose = require('mongoose');
const { Schema } = mongoose;



const Coporate = mongoose.model('Coporates', coporateSchema);

module.exports = {
    Coporate,
}