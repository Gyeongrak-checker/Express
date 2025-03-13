const { Market} = require("../database/schema/marketSchema");
const Exception = require("../exception/exception");
const { getMarketCode, getCorporateCode} = require("../modules/open-api/request");


// TODO: 데이터 변환 및 저장, 조

const save = async () => {
   const [marketCode, coperateCode ]  =
        await Promise.all([getMarketCode(0), getCorporateCode(0)]);

    marketCode.row.forEach((market => {
        const coporates = coperateCode.row.filter(coperate => coperate.CODEID.substring(0, 5) === market.CODEID)

    }));

}


const getCode = async () => {

}



module.exports = {
    save,
    getCode
}