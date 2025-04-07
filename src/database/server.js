const mongoose = require('mongoose');
const { Product } = require('./schema/productSchema');
const { Market } = require('./schema/marketSchema');

const marketService = require('../service/marketService');
const productService = require('../service/productService');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose
        .connect(`mongodb://localhost:27017/market`)
        .then(() => console.log('mongoDB connected'))
        .then(async () => {
            if (!Product.exists()) {
                await productService.save();
            }

            if (!Market.exists()) {
                await marketService.save();
            }
        });
};

module.exports = connect;
