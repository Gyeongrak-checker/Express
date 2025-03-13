const { Market } = require("../database/schema/marketSchema");
const Exception = require("../exception/exception");
const { getMarketCode, getCorporateCode} = require("../modules/open-api/request");


const save = async () => {
   const [marketCode, coperateCode ] =
        await Promise.all([getMarketCode(0), getCorporateCode(0)]);


    marketCode.row.map(market => {
       const coporates = coperateCode.row.filter(coperate => {
            return coperate.CODEID.substring(0, 6) === market.CODEID;
       });
       //TODO: 스키마 생성
   });

}


const getCode = async () => {

}



module.exports = {
    save,
    getCode
}