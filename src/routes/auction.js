const express = require('express');
const asyncMiddleware = require('../middlewere/asyncHandler');
const router = express.Router();

const auctionService = require('../service/auctionService');

router.get('/', asyncMiddleware(async(req, res) => {
    // TODO: 파라미터 설계
    res.json(await auctionService.get(req.query));
}))

module.exports = router;