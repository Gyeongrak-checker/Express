const openApi = require("../modules/open-api/request")

const get = async ({start, end, market, large, mid, small}) => {
    const response = await openApi.getAuction(start, end, market, large, mid, small);
    console.log(response);
}   

module.exports = {
    get
}