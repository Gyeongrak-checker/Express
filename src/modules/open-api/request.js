const axios = require('axios');
require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.params = {
    serviceKey : process.env.API_KEY,
    apiType : 'json'
};

const getMarketCode = async () => {
    const response = await axios.get('/code/whsal.do');
    return response.data;
};


const getProductCode = async(pageNo) => {
    const response = await axios.get('/code/good.do', {
        params: {
            pageNo
        }
    })
    
    return response.data;
}


const getCorporateCode = async() => {
    const response = await axios('/code/cmp.do');
    return response.data;
}


const getAuction = async(page, market) => {
    const response = await axios.get('/price/real.do', {
        params: {
            pageNo: 1,
            whsalCd: 370101,
            // largeCd: large,
            // midCd: mid,
        }
    })
    return response.data.data;
}


module.exports = {
    getMarketCode,
    getProductCode,
    getCorporateCode,
    getAuction
};
