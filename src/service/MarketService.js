const { Market} = require("../database/schema/marketSchema");
const Exception = require("../exception/exception");
const { getMarketCode, getCorporateCode} = require("../modules/open-api/request");


// TODO: 데이터 변환 및 저장, 조

const save = async () => {
   const [marketCode, coperateCode ]  =
        await Promise.all([getMarketCode(0), getCorporateCode(0)]);



    const result = marketCode.row.map((market => {
        const coporates = coperateCode.row.map(coporate => {});
    }));

}


const getCode = async () => {

}



module.exports = {
    save,
    getCode
}