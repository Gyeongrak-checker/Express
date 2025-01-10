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


const getAuction = async(day, start, end, market, large, mid, small) => {
    const response = await axios.get(`http://${process.env.PUBLIC_API_URL}/${start}/${end}?SALEDATE=${day}&WHSALCD=${market}${large ? '&LARGE=' + large : ''}${large ? '&MID=' + mid : ''}${large ? '&SMALL=' + small : ''}`);
    if(response.data.Grid_20240625000000000654_1.result.code !== 'INFO-000') {
        // 임시 예외 처리
        console.error(response.data.Grid_20240625000000000654_1.result.message);
        return [];
    }
    return response.data.Grid_20240625000000000654_1.row;
    
}


module.exports = {
    getMarketCode,
    getProductCode,
    getCorporateCode,
    getAuction
};  
