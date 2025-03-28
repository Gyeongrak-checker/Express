const openApi = require('../modules/open-api/request');
const { Products } = require('../database/schema/productSchema');
const Exception = require('../exception/exception');

// {
//     "ROW_NUM": 1,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "53",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "벚나무",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 2,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "54",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "히코리",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 3,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "55",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "단풍나무",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 4,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "56",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "마호가니",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 5,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "57",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "참나무",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 6,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "58",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "호도나무",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 7,
//     "LARGE": "31",
//     "MID": "02",
//     "SMALL": "ZZ",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(일반용재)",
//     "GOODNAME": "기타 활엽수",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 8,
//     "LARGE": "31",
//     "MID": "03",
//     "SMALL": "00",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(1종구조재)",
//     "GOODNAME": "제재목(1종구조재)",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 9,
//     "LARGE": "31",
//     "MID": "03",
//     "SMALL": "01",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(1종구조재)",
//     "GOODNAME": "낙엽송",
//     "GUBN": "Y"
// },
// {
//     "ROW_NUM": 10,
//     "LARGE": "31",
//     "MID": "03",
//     "SMALL": "02",
//     "LARGENAME": "목재류",
//     "MIDNAME": "제재목(1종구조재)",
//     "GOODNAME": "더글라스퍼",
//     "GUBN": "Y"
// }

// 데이터 변형
const toDocument = async ({ totalCnt, startRow, endRowl, result, row }) => {
    const response = [
        // {
        //     code: row[0].LARGE,
        //     name: row[0].LARGENAME,
        //     mids: [
        //         {
        //             code: row[0].MID,
        //             name: row[0].MIDNAME,
        //             small: [
        //                 {
        //                     code: row[0].SMALL,
        //                     name: row[0].GOODNAME,
        //                 },
        //             ],
        //         },
        //     ],
        // },
    ];

    row.forEach(data => {
        
    });
    return response;
};

const save = async () => {
    let start = 0;
    while (true) {
        const response = await openApi
            .getProductCode(start)
            .then(toDocument)
            .then(docs => Products.insertMany(docs));
        break;
    }
};

const getCodes = async () => {};

module.exports = {
    save,
};
