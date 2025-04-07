const openApi = require('../modules/open-api/request');
const { Large, Mid, Product } = require('../database/schema/productSchema');
const Exception = require('../exception/exception');
const { HttpStatusCode } = require('axios');
const pLimit = require('p-limit');

const save = async () => {
    let start = 0;
    let end = openApi.MAX_COUNT;
    const total = await openApi.getProductTotal();
    const limit = pLimit(5);

    const tasks = [];

    while (start <= total) {
        const { row } = await openApi.getProductCode(start, end);
        start += openApi.MAX_COUNT;
        end += openApi.MAX_COUNT;

        tasks.push(
            limit(async () => {
                try {
                    for (const item of row) {
                        const large = await openApi.upsertLarge(item.LARGE, item.LARGENAME);
                        const mid = await openApi.upsertMid(item.MID, item.MIDNAME, large._id);
                        await new Product({ code: item.SMALL, name: item.GOODNAME, mid: mid._id }).save();
                    }
                } catch (error) {
                    console.error(error);
                }
            }),
        );
    }
    await Promise.all(tasks);
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
