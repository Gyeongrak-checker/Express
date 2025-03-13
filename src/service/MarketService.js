const { Market } = require('../database/schema/marketSchema');
const Exception = require('../exception/exception');
const { getMarketCode, getCorporateCode } = require('../modules/open-api/request');

const save = async () => {
    const [marketCode, coperateCode] = await Promise.all([getMarketCode(0), getCorporateCode(0)]);

    // TODO: 필요없는 값까지 들어오는 이슈 수정 필요
    const result = marketCode.row.map(market => {
        const corporates = [];
        coperateCode.row.forEach(corporate => {
            if (corporate.CODEID.substring(0, 6) === market.CODEID) {
                corporates.push({
                    code: corporate.CODEID,
                    name: corporate.CODENAME,
                });
            }
        });
        return {
            name: market.CODENAME,
            code: market.CODEID,
            corporate: corporates,
        };
    });
    await Market.insertMany(result);
};

const getCode = async () => {};

module.exports = {
    save,
    getCode,
};
