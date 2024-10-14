const openApi = require("../modules/open-api/request")

const getAuctionList = async(param) => {
    console.log(param)
    const data = await openApi.getAuction();
    return data;
}   

module.exports = {
    getAuctionList
}