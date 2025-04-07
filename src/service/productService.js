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
    // 소분류: large, mid 둘 다 있을 때
    if (large && mid) {
        const products = await Product.find().populate({
            path: 'mid',
            match: { code: mid },
            populate: {
                path: 'large',
                match: { code: large },
            },
        });

        // mid 또는 large 조건에 맞지 않아 걸러진 항목은 제외
        const filtered = products.filter(p => p.mid && p.mid.large);

        return filtered.map(res => ({
            name: res.name,
            code: res.code,
        }));
    }

    // 중분류: large만 있을 때
    if (large) {
        const mids = await Mid.find().populate({
            path: 'large',
            match: { code: large },
        });

        const filtered = mids.filter(m => m.large);

        return filtered.map(res => ({
            name: res.name,
            code: res.code,
        }));
    }

    // 대분류만 조회
    const larges = await Large.find();
    return larges.map(res => ({
        name: res.name,
        code: res.code,
    }));
};
module.exports = {
    save,
    getCodes,
};
