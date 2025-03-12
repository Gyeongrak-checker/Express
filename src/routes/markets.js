const express = require('express');
const marketService = require('../service/marketService');
const router = express.Router();


// 도매시장 & 법인 코드 조회
router.get('/', async(req, res, next) => {
    try {
        const result = await marketService.save();
        res.json({data: 'success'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
