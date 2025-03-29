const express = require('express');
const router = express.Router();

const productService = require('../service/productService');

// 품목 코드 조회
router.get('/', async (req, res) => {
    const responseData = await productService.getCodes();
    res.json(responseData);
});

router.get('/:large', async (req, res) => {
    const { large } = req.params;
    const responseData = await productService.getCodes(large);
    res.json(responseData);
});

router.get('/:large/:mid', async (req, res) => {
    const { large, mid } = req.params;
    const responseData = await productService.getCodes(large, mid);
    res.json(responseData);
});

module.exports = router;
