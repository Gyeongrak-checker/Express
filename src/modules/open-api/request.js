const axios = require('axios');
require('dotenv').config();

axios.defaults.baseURL = process.env.AT_API_URL;
axios.defaults.params = {
    serviceKey : process.env.AT_API_KEY,
    apiType : 'json'
};

const getMarketCode = async () => {
    const response = await axios.get('/code/whsal.do');
    return response.data;
};

const getCorporateCode = async() => {
    const response = await axios('/code/cmp.do');
    return response.data;
}

const getProductCode = async(pageNo) => {
    const response = await axios.get('/code/good.do', {
        params: {
            pageNo
        }
    })
    
    return response.data;
}




const getAuction = async(start, end, market, large, mid, small) => {
    const response = await axios.get('http://211.237.50.150:7080/openapi/dda6429a2fffcb0495719f21b17e5f398a3800cff5f4ed800358d84c700ce416/json/Grid_20240625000000000654_1/1/10?SALEDATE=20250104&WHSALCD=110001&LARGE=06');
    return response.data;
}


module.exports = {
    getMarketCode,
    getProductCode,
    getCorporateCode,
    getAuction
};
