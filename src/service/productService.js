const openApi = require("../modules/open-api/request");
const { Products } = require('../database/schema/productSchema');
const fs = require('fs');

const productCount = 17553 / 1000 + 1;

const save = async () => {
//   const response = await openApi.getProductCode();
     // TODO: 품목 캐싱

//     const mock = fs.readFileSync('./mock.json');

//     const response = JSON.parse(mock);

     const result = [];

     // 1. 데이터 요청
     const promiseArray = [];
     for(let i = 1; i < productCount; i++) {
         promiseArray.push(openApi.getProductCode(i).then(res => res.data));
     }
     let response = await Promise.all(response);
     // 2. 데이터 정렬
     response = response.sort((a, b) => a.rn - b.rn);
     // 3. 데이터 구죠 변경
     for(const product of response) {
         const tmp = {};
         if(product.mid === "00") {
             tmp.rn = product.rn;
             tmp.large = product.large;
             tmp.largeName = product.largeName;
             tmp.mid = [];

             result.push(tmp);
         } else if(product.small === "00") {
             tmp.rn = product.rn;
             tmp.mid = product.mid;
             tmp.midName = product.midName;
             tmp.small = [];
             result[result.length - 1].mid.push(tmp);
         } else {
             tmp.rn = product.rn;
             tmp.gooName = product.goodName;
             result[result.length - 1].mid[result.mid.length -1].small.push(tmp);
         }
     }
     // 4. MongoDB에 삽입


     return result;
}


const get = async () => {
   const products = await Products.find();
   if(products.length === 0) {
      await save();
   }
   return products;
}

module.exports = {
   get,
}