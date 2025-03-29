const axios = require('axios');
const Exception = require('../../exception/exception');
const { HttpStatusCode } = require('axios');
require('dotenv').config();

axios.defaults.baseURL = `${process.env.API_URL}/${process.env.API_KEY}/json`;

const serviceCode = {
    market: 'Grid_20240625000000000661_1',
    product: 'Grid_20240626000000000668_1',
    coporate: 'Grid_20240626000000000662_1',
    auction: 'Grid_20240625000000000654_1',
};

const MAX_COUNT = 999;
const AXIOS_ERROR = 'OPEN API 오류 발생';

const getMarketCode = async start => {
    return await axios(`/${serviceCode.market}/${start}/${MAX_COUNT}`)
        .then(response => checkReqeust(response, serviceCode.market))
        .catch(e => {
            throw new Exception(AXIOS_ERROR + ': 도매시장');
        });
};

const getCorporateCode = async start => {
    return await axios(`/${serviceCode.coporate}/${start}/${MAX_COUNT}`)
        .then(response => checkReqeust(response, serviceCode.coporate))
        .catch(e => {
            throw new Exception(AXIOS_ERROR + ': 법인');
        });
};

const getProductCode = async (start, end) => {
    const response = await axios(`${serviceCode.product}/${start}/${end}`)
        .then(response => checkReqeust(response, serviceCode.product))
        .catch(e => {
            console.error(e);
            throw new Exception(AXIOS_ERROR + ': 품목');
        });
    return response;
};

const getProductTotal = async () => {
    const response = await axios(`${serviceCode.product}/0/0`)
        .then(response => response.data[serviceCode.product].totalCnt)
        .catch(e => {
            console.error(e);
            throw new Exception(AXIOS_ERROR + ': 품목');
        });
    return response;
};

const getAuction = async (day, start, end, market, large, mid, small) => {};

// OpenAPI 요청 예외 처리
const checkReqeust = (response, service) => {
    if (!response.data[service] && response.data.result.code !== 'INFO-000') {
        console.log(response);
        throw new Exception(response.data.result.message, HttpStatusCode.InternalServerError);
    }
    return response.data[service];
};

module.exports = {
    MAX_COUNT,
    getMarketCode,
    getProductCode,
    getProductTotal,
    getCorporateCode,
    getAuction,
};
