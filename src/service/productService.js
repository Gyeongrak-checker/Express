const openApi = require('../modules/open-api/request');
const { Large, Mid, Product } = require('../database/schema/productSchema');
const Exception = require('../exception/exception');
const { HttpStatusCode } = require('axios');

// 데이터 변형
const insert = async row => {
    const schemaResult = {
        large: [],
        mid: [],
        product: [],
    };

    let large = null;
    let mid = null;

    row.forEach(e => {
        if (e.SMALL === '-') {
            return;
        }

        if (e.LARGE !== lastLarge.code) {
            large = new Large({ name: e.LARGE, code: e.LARGE });
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
    let end = openApi.MAX_COUNT;
    let total = await openApi.getProductTotal();
    while (start <= total) {
        const { row } = await openApi.getProductCode(start, end);
        start += openApi.MAX_COUNT;
        end += openApi.MAX_COUNT;
        await insert(row);
    }
};

const getCodes = async (large, mid) => {
    await save();

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
