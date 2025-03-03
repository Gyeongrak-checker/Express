const { Market} = require("../database/schema/marketSchema");
const Exception = require("../exception/exception");



const getCode = async () => {
    throw new Exception("에러 발생", 400);
}



module.exports = {
    getCode
}