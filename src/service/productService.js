const openApi = require("../modules/open-api/request");


const getProducts = async (pageNumber) => {
   const products  = await openApi.getProductCode(pageNumber);
   return products;
}

module.exports = {
   getProducts,
}