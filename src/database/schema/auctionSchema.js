const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: 스키마 구조 재설계

const salesDataSchema = new Schema({
    price: { type: Number }, // 가격
    qty: { type: Number }, // 수량
    std: { type: String }, // 규격
    sbidtime: { type: Date }, // 경락일시
});

const auctionSchema = new Schema({
    whsal: { type: Schema.Types.ObjectId, ref: 'Markets' },
    cmp: { type: Schema.Types.ObjectId, ref: 'Coporates' },
    product: { type: Schema.Types.ObjectId, ref: 'Products' },
    salesData: [salesDataSchema],
    createdAt: { type: Date, default: Date.now, expires: '1d' },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = {
    Auction,
};

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

{
  "commonInfo": {
    "whsal": objectId,
    "cmp": objectId,
    "product" : objectId
    "sanCd": "750800",
    "sanName": "경북 영주시"
  },
  "salesData": [
    {
      "cost": 69800,
      "qty": 1,
      "std": "20kg 상자",
      "sbidtime": "2024-10-15 12:00:10"
    },
    {
      "cost": 30000,
      "qty": 1,
      "std": "20kg 상자",
      "sbidtime": "2024-10-15 12:00:07"
    },
    {
      "cost": 43900,
      "qty": 5,
      "std": "20kg 상자",
      "sbidtime": "2024-10-15 12:00:04"
    },
    {
      "cost": 50000,
      "qty": 1,
      "std": "20kg 상자",
      "sbidtime": "2024-10-15 12:00:00"
    },
    {
      "cost": 93000,
      "qty": 14,
      "std": "20kg 상자",
      "sbidtime": "2024-10-15 11:59:56"
    },
    {

      "cost": 93900,
      "qty": 25,
      "std": "20kg 상자",
      "sbidtime": "2024-10-15 11:59:52"
    }
  ]
}



*/
