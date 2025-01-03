const { Products } = require("../database/schema/productSchema");
const openApi = require("../modules/open-api/request")

const get = async ({page, market, large, mid, small}) => {

    // TODO: 로직 구현
    return await openApi.getAuction(page, market, large, mid, small);
}   

module.exports = {
    get
}