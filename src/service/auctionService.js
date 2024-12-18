const { Products } = require("../database/schema/productSchema");
const openApi = require("../modules/open-api/request")

const getAuctionList = async(param) => {
    console.log(param)
    // const data = await openApi.getAuction();

    let test = await Products.findById(param.target);
    console.log(test);

    return {};
}   

module.exports = {
    getAuctionList
}