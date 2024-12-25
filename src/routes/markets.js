const express = require('express');
const asyncMiddleware = require('../middlewere/asyncHandler');
const marketService = require('../service/MarketService');
const router = express.Router();


// 도매시장 & 법인 코드 조회
router.get('/', asyncMiddleware(async(req, res) => {
    const result = await marketService.getCode();
    res.json(result);
}));

module.exports = router;
