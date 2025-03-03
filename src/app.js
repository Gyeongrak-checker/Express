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
const {HttpStatusCode} = require("axios");


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 라우터 설정
app.use('/markets', markets);
app.use('/products', products);
app.use('/auction', auction)

// 데이터베이스 연결
connect();

// 404 처리 미들웨어
app.use(function(req, res, next) {
  next(createError(404));
});

// 전역 에러 처리 미들웨어
app.use((err, req, res, next) => {
  if (err instanceof Exception) {
    return res.status(err.httpCode).json({
      code: err.httpCode,
      message: err.message
    });
  }
  

  console.error(err); // 예상치 못한 에러는 콘솔 로그 (실제로는 로그 시스템에 저장)
  res.status(HttpStatusCode.InternalServerError).json({
    code: HttpStatusCode.InternalServerError,
    message: "서버 오류 발생",
  });
});

module.exports = app;
