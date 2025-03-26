const { Market } = require('../database/schema/marketSchema');
const { getMarketCode, getCorporateCode } = require('../modules/open-api/request');

const save = async () => {
    const [marketCode, coperateCode] = await Promise.all([getMarketCode(0), getCorporateCode(0)]);

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
            comporate: corporates,
        };
    });
    await Market.insertMany(result);
};

const getCode = async () => {
    return await Market.find();
};

module.exports = {
    save,
    getCode,
};
