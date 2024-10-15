const mongoose = require('mongoose');
const { Schema } = mongoose;

const coporateSchema = new Schema({

    whsal: {
        type: Schema.Types.ObjectId,
        ref: "Markets"
    },
    cmp: {
        type: Schema.Types.ObjectId,
        ref: "Coporates"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Products"
    },
    sanCd: {type: String},
    sanName: {type: String},
    price: {type: Number},
    std: {type: String},
    qty: {type: Number}, //
    sbindtime: {type: Date}, // 경락 일시
    createdAt: { type: Date, default: Date.now, expires: '1d' },
});

const Auction = mongoose.model('Auction', coporateSchema);

module.exports = {
    Auction,
}


/**
항목	코드/값	설명
도매시장 (whsal)	110001	도매시장코드 -> mongo

법인 (cmp)	11000101	법인코드 -> mongo

상품 (product)	06	대분류코드 -> mongo

산지코드 (sanCd)	630000	산지코드
산지명 (sanName)	경상남도 창원시 마산회원구	산지명
경락가 (price)	6600	경락가
물량 (qty)	13	물량
규격 (std)	10kg 상자	규격 (단량, 단위, 포장)
경락일시 (sbidtime)	2021-06-07 03:41:55	경락일시
*/