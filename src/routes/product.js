const express = require('express');
const router = express.Router();

const productService = require('../service/productService');

// 품목 코드 조회
router.get('/', async (req, res) => {
    const responseData = await productService.get();
    res.json(responseData);
});

module.exports = router;
