const openApi = require("../modules/open-api/request")
const { Auction } = require('../database/schema/auctionSchema');

const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

const toResponse = (auction) => {
    // SALEDATE	경락일자
    // WHSALCD	도매시장코드
    // WHSALNAME	도매시장명
    // CMPCD	법인코드
    // CMPNAME	법인명
    // LARGE	대분류코드
    // LARGENAME	대분류명
    // MID	중분류코드
    // MIDNAME	중분류명
    // SMALL	소분류코드
    // SMALLNAME	소분류명
    // SANCD	산지코드
    // SANNAME	산지명
    // COST	경락가
    // QTY	물량
    // STD	규격(단량, 단위, 포장)
    // SBIDTIME	경락일시

    return auction.map(auction => {
        return {
            auction_time: auction.SBIDTIME, // 경매 시장
            name: auction.SMALLNAME, // 품목
            cmp_name: auction.WHSALNAME, // 도매시장
            san_name: auction.SANNAME, // 산지
            cost: auction.COST, // 경락가
            std: auction.STD, // 규격    
        }
    })
    

}

const save = async ({start, end, market, large, mid, small}) => {
    
    const now = formatDateToYYYYMMDD(new Date());
    let response  = await openApi.getAuction(now, start, end, market, large, mid, small).then(toResponse);

    // TODO: 경락 정보 캐싱

    return response;
}


const get = async (requestBody) => {    
    let auction = await Auction.find();
    if(auction.length === 0) {
        auction = await save(requestBody);
        console.log(auction)
    }

    return auction;
}   

module.exports = {
    get
}