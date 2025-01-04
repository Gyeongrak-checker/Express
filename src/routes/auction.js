const express = require('express');
const asyncMiddleware = require('../middlewere/asyncHandler');
const router = express.Router();

const auctionService = require('../service/auctionService');

router.get('/', asyncMiddleware(async(req, res) => {
    res.json(await auctionService.get(req.query));
}))

module.exports = router;