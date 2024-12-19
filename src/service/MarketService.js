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

    for(let coporate of coporateCodes) {
        const code = coporate.codeId.substring(0, 6);
        const market = tmpMap.get(code);

        if(market === undefined) {
            const etc = tmpMap.get(etcCode);
            etc.coporates.push(coporate);
            tmpMap.set(etcCode, etc);
            continue;
        }

        market.coporates.push(coporate);
        tmpMap.set(code, market);
    }

    return Array.from(tmpMap.values());
}

// MongoDB가 가지고 있던 코드 조회
const getMarketCorporateCodeByMongo = async () => {

}


// 품목 코드 조회
const getProductCode = async ({ large = '00', mid = '00', small = '00' }) => {

};

// 법인 조회
const getCorporateCode = async(marketCode) => {
    return await saveMarketCoporateCode();
}

const getMarketCode = async () => {

}



module.exports = {
    getCorporateCode
}