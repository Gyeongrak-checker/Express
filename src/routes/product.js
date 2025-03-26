const express = require('express');
const router = express.Router();

const productService = require('../service/productService');

// 품목 코드 조회
router.get('/', async (req, res) => {
    const responseData = await productService.save(0);
    res.json(responseData);
});

module.exports = router;
