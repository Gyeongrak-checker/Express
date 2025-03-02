const axios = require('axios');
require('dotenv').config();

axios.defaults.baseURL = `${process.env.API_URL}/${process.env.API_KEY}/json`

const serviceCode = {
    market: 'Grid_20240625000000000661_1',
    product: 'Grid_20240626000000000668_1',
    coporate: 'Grid_20240626000000000662_1',
    auction: 'Grid_20240625000000000654_1'
}

const resultCode = {
    "INFO-000": "정상 처리되었습니다.",
    "INFO-100": "인증키가 유효하지 않습니다. 인증키가 없는 경우, 인증키를 신청하세요",
    "INFO-200": "공개되지 않은 데이터이거나 데이터 정보가 없습니다.",
    "ERROR-300": "기본값이 누락되었습니다. 요청인자를 참고하십시오.",
    "ERROR-301": "파일타입 값이 누락 혹은 유효하지 않습니다. 요청인자 중 TYPE를 확인하십시오.",
    "ERROR-310": "해당하는 서비스를 찾을 수 없습니다.",
    "ERROR-331": "요청시작위치 값을 확인하십시오. 요청인자 중 START_INDEX를 확인하십시오.",
    "ERROR-332": "요청종료위치 값을 확인하십시오. 요청인자 중 END_INDEX를 확인하십시오.",
    "ERROR-333": "요청위치 값의 타입이 유효하지 않습니다. 요청위치 값은 정수를 입력하세요",
    "ERROR-334": "요청종료위치 보다 요청시작위치가 더 큽니다. 요청시작조회건수는 정수를 입력하세요.",
    "ERROR-335": "샘플데이터(샘플키:sample)는 한번에 최대 5건을 넘을 수 없습니다. 요청시작위치와 요청종료위치 값은 1~5 사이만 가능합니다.",
    "ERROR-336": "데이터요청은 한번에 최대 1000건을 넘을 수 없습니다. 요청종료위치에서 요청시작위치를 뺀 값이 1000을 넘지 않도록 수정하세요.",
    "ERROR-340": "필수 파라미터가 누락되었습니다.",
    "ERROR-341": "필수 파라미터 데이터 형식이 맞지 않거나 크기가 맞지 않습니다.",
    "ERROR-342": "선택 파라미터 데이터 형식이 맞지 않거나 크기가 맞지 않습니다.",
    "ERROR-350": "일 요청 횟수를 초과하였습니다.",
    "ERROR-500": "서버 오류입니다. 지속적으로 발생 시 관리자에게 문의 바랍니다.",
    "ERROR-600": "데이터베이스 연결 오류입니다. 지속적으로 발생 시 관리자에게 문의 바랍니다.",
    "ERROR-601": "SQL 문장 오류입니다. 지속적으로 발생 시 관리자에게 문의 바랍니다."
}

const getMarketCode = async (start, end) => {
    // TODO: 예외처리 필요
    try {
        const response = await axios.get(`/${serviceCode.market}/${start}/${end}`);
    } catch (e) {

    }
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
    resultCode,
    getMarketCode,
    getProductCode,
    getCorporateCode,
    getAuction
};  
