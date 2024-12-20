const openApi = require('../modules/open-api/request');
const { Market } = require('../database/schema/marketSchema');
const { Products } = require('../database/schema/productSchema');


const etcCode = '990014';
// 공공 데이터에서 시장 코드 조회
const saveMarketCoporateCode = async () => {
    const marketPromise = openApi.getMarketCode();
    const coporatePromise = openApi.getCorporateCode();

    const response = await Promise.all([marketPromise, coporatePromise]);

    const marketCodes = response[0].data;
    const coporateCodes = response[1].data;

    // key: value를 이용하여 코드를 효율적으로 찾는다.
    const tmpMap = new Map();
    marketCodes.forEach(market => {
        market.coporates = [];
        tmpMap.set(market.codeId, market);
    });
    
    const etcMarket = {
        codeId: etcCode,
        codeName: '기타',
        coporates: []
    };

    tmpMap.set(etcCode, etcMarket);

    for (let coporate of coporateCodes) {
        const code = coporate.codeId.substring(0, 6);
        const market = tmpMap.get(code);

        if (market === undefined) {
            const etc = tmpMap.get(etcCode);
            etc.coporates.push(coporate);
            tmpMap.set(etcCode, etc);
            continue;
        }

        market.coporates.push(coporate);
        tmpMap.set(code, market);
    }

    // Map의 값을 배열로 변환
    const markets = Array.from(tmpMap.values());

    // Market 데이터베이스에 저장
    const marketDocs = markets.map(market => ({
        name: market.codeName,
        code: market.codeId,
        comporate: market.coporates.map(cop => ({
            code: cop.codeId,
            name: cop.codeName
        }))
    }));

    // 기존 데이터 삭제 후 새로운 데이터 저장
    await Market.deleteMany({});
    await Market.insertMany(marketDocs);

    return marketDocs; // 저장된 데이터를 반환 (옵션)
};

const getCode = async () => {
   return await saveMarketCoporateCode();
}

module.exports = {
    getCode
}