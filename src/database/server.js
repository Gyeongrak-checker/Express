const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', false);
    }
    mongoose.connect(`mongodb://localhost:27017/market`).then(() => console.log('mongoDB connected'));
};

module.exports = connect;
