const axios = require('axios');
const Exception = require('../../exception/exception');
const {HttpStatusCode} = require("axios");
require('dotenv').config();

axios.defaults.baseURL = `${process.env.API_URL}/${process.env.API_KEY}/json`

const serviceCode = {
    market: 'Grid_20240625000000000661_1',
    product: 'Grid_20240626000000000668_1',
    coporate: 'Grid_20240626000000000662_1',
    auction: 'Grid_20240625000000000654_1'
}

const getMarketCode = async (start, end) => {
    const axiosResponse = await axios.get(`/${serviceCode.market}/${start}/${end}`);
    let { result, row, totalCnt, startRow, endRow } = await axiosResponse.data[serviceCode.market];

    result.code = 'INFO-999';

    if(result.code !== 'INFO-000') {
        throw new Exception(result.message, HttpStatusCode.InternalServerError);
    }

    return row;
};

const getCorporateCode = async(start, end) => {
    const response = await axios('/code/cmp.do');
    return response.data;
}

const getProductCode = async(start, end) => {

}


const getAuction = async(day, start, end, market, large, mid, small) => {
    
}

// TODO: 데이터 변환 필요
const getData = (response, code) => {

}


module.exports = {
    serviceCode,
    getMarketCode,
    getProductCode,
    getCorporateCode,
    getAuction
};  
