const express = require('express');
const marketService = require('../service/MarketService');
const router = express.Router();


// 도매시장 & 법인 코드 조회
router.get('/', async(req, res, next) => {
    try {
        const result = await marketService.getCode();
        res.json(result);

    } catch (e) {
        next();
    }
});

module.exports = router;
