const { Market} = require("../database/schema/marketSchema");
const Exception = require("../exception/exception");
const { getMarketCode } = require("../modules/open-api/request");



const getCode = async () => {
    const markets = await getMarketCode(0);



//    const coporate = await getCorporateCode(0);
    console.log(markets);

}



module.exports = {
    getCode
}