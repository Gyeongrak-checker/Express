const openApi = require('../modules/open-api/request');
const { Large, Mid, Product } = require('../database/schema/productSchema');
const Exception = require('../exception/exception');
const { HttpStatusCode } = require('axios');

// 데이터 변형
const insert = async ({ row }) => {
    // 중복 방지
    const existCheck = {
        large: new Set(),
        mid: new Set(),
        product: new Set(),
    };

    const schemaResult = {
        large: [],
        mid: [],
        product: [],
    };

    row.forEach(e => {
        const large = new Large({ code: e.LARGE, name: e.LARGENAME });
        const mid = new Mid({ code: e.MID, name: e.MIDNAME, large: large._id });
        const product = new Product({ code: e.SMALL, name: e.GOODNAME, mid: mid._id });

        if (!existCheck.large.has(e.LARGE)) {
            existCheck.large.add(e.LARGE);
            schemaResult.large.push(large);
        }

        if (!existCheck.mid.has(e.MID)) {
            existCheck.mid.add(e.MID);
            schemaResult.mid.push(mid);
        }
        if (!existCheck.product.has(e.SMALL)) {
            existCheck.product.add(product);
            schemaResult.product.push(product);
        }
    });

    return await Promise.all([
        Large.insertMany(schemaResult.large),
        Mid.insertMany(schemaResult.mid),
        Product.insertMany(schemaResult.product),
    ]).catch(e => {
        console.error(e);
        throw new Exception('품목 캐싱 실패', HttpStatusCode.InternalServerError);
    });
};

const save = async () => {
    let start = 0;
    let total = await openApi.getProductTotal();
    while (start < total) {
        const response = await openApi.getProductCode(start).then(insert);
        start += response.endRow;
    }
};

const getCodes = async (large, mid) => {
    // 소분류
    if (large && mid) {
    }

    // 중분류
    if (large) {
    }

    // 대분류
    return await Large.find();
};

module.exports = {
    save,
    getCodes,
};
