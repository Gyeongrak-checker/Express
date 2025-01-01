const { Products } = require("../database/schema/productSchema");
const openApi = require("../modules/open-api/request")

const get = async ({page, market, large, mid, small}) => {

    await openApi.getAuction(page, market, large, mid, small);
    return {};
}   

module.exports = {
    get
}