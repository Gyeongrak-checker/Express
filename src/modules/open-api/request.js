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


const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}


const getAuction = async(start, end, market, large, mid, small) => {
    const now = formatDateToYYYYMMDD(new Date());
    console.log();
    const response = await axios.get(`http://${process.env.PUBLIC_API_URL}/${start}/${end}?SALEDATE=${now}&WHSALCD=${market}${large ? '&LARGE=' + large : ''}${large ? '&MID=' + mid : ''}${large ? '&SMALL=' + small : ''}`);
    if(response.data.result.code !== 'INFO-000') {
        // 임시 예외 처리
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
