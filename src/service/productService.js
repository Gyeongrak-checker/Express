const openApi = require("../modules/open-api/request");
const { Products } = require('../database/schema/productSchema');
const fs = require('fs');

const productCount = 17553 / 1000 + 1;

const save = async () => {
     // 1. 데이터 요청
    let response =  [];

    for(let i = 1; i <= productCount; i++) {
        response.push(await openApi.getProductCode(i).then(res => res.data));
    }
 

    // let response = JSON.parse(fs.readFileSync('mock.json', 'utf8'));


     // 2. 데이터 정렬
    response = response
        .flat(2)
        .sort((a, b) => a.rn - b.rn);

     // 3. 데이터 구죠 변경
    let result = toDocument(response);

     // 4. MongoDB에 삽입
    await Products.insertMany(result);
}

const toDocument = (array) => {
    const result = [];
    for(const product of array) {
         const tmp = {};
         if(product.mid === "00") {
            tmp.code = product.large;
            tmp.name = product.largeName;
            tmp.mid = [];

             result.push(tmp);
         } else if(product.small === "00") {
             tmp.code = product.mid;
             tmp.name= product.midName;
             tmp.small = [];

             result[result.length - 1].mid.push(tmp);
         } else {
             tmp.name = product.goodName;
             tmp.code = product.small;
             const midLength = result[result.length - 1].mid.length - 1;
             result[result.length - 1].mid[midLength].small.push(tmp);
          }
     }
    return result;
}

const get = async ({large, mid, small}) => {
   let products = await Products.find();
   if(products.length === 0) {
        await save();
        products = await Products.find();
   }
   return products;
}

module.exports = {
   get,
}