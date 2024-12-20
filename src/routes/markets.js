const express = require('express');
const asyncMiddleware = require('../middlewere/asyncHandler');
const router = express.Router();

const marketService = require('../service/marketService')

// 도매시장 & 법인 코드 조회
router.get('/', asyncMiddleware(async(req, res) => {
    const result = await marketService.getCode();
    res.json(result);
}));

module.exports = router;
