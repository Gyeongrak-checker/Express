const express = require('express');
const router = express.Router();

const auctionService = require('../service/auctionService');

router.get('/', async (req, res) => {
    res.json(await auctionService.get(req.query));
});

module.exports = router;
