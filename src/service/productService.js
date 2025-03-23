const openApi = require('../modules/open-api/request');
const { Products } = require('../database/schema/productSchema');
const fs = require('fs');

const productCount = 17553 / 1000 + 1;

const update = async () => {
    const res = await openApi.getProductCode(0, 10);
};

const toDocument = array => {
    const result = [];
    for (const product of array) {
        const tmp = {};
        if (product.mid === '00') {
            tmp.code = product.large;
            tmp.name = product.largeName;
            tmp.mid = [];

            result.push(tmp);
        } else if (product.small === '00') {
            tmp.code = product.mid;
            tmp.name = product.midName;
            tmp.small = [];

            result[result.length - 1].mid.push(tmp);
        } else {
            tmp.name = product.goodName;
            tmp.code = product.small;
            const midLength = result[result.length - 1].mid.length - 1;
            result[result.length - 1].mid[midLength].small.push(tmp);
        }
    }
    return result;
};

const get = async () => {
    if (!(await Products.exists())) {
        await update();
    }

    return await Products.find();
};

module.exports = {
    get,
};
