const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connect = require('./database/server');
const dotenv = require('dotenv');
dotenv.config();

const markets = require('./routes/markets');
const products = require('./routes/product');
const auction = require('./routes/auction');

const { HttpStatusCode } = require('axios');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 라우터 설정
app.use('/markets', markets);
app.use('/products', products);
app.use('/auction', auction);

// 데이터베이스 연결
connect();

// 404 핸들러 (모든 라우터 등록 이후에 위치)
app.use(function (req, res, next) {
    next(createError(404));
});

// 전역 에러 핸들러 (반드시 4개 인자)
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || HttpStatusCode.InternalServerError).json({
        code: err.status || HttpStatusCode.InternalServerError,
        message: err.message || '서버 오류 발생',
    });
});

module.exports = app;
