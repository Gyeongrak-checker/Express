const openApi = require('../modules/open-api/request');
const { Market } = require('../database/schema/marketSchema');
const { Products } = require('../database/schema/productSchema');

// 시장 코드 조회
const getMarketCode = async () => {
    
}

const saveMacketCode = async () => {
    
}

// 품목 코드 조회
const getProductCode = async ({ large = '00', mid = '00', small = '00' }) => {
    const products = await Products.find();
    return products;
};



module.exports = {
    getMarketCode,
    getProductCode,
}