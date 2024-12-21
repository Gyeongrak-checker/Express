const openApi = require("../modules/open-api/request");
const { Products } = require('../database/schema/productSchema');
const fs = require('fs');
const save = async () => {
//   const response = await openApi.getProductCode();
     // TODO: 품목 캐싱

     const mock = fs.readFileSync('./mock.json');

     const response = JSON.parse(mock);

     console.log(response)

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