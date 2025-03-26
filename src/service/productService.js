const openApi = require('../modules/open-api/request');
const { Products } = require('../database/schema/productSchema');
const Exception = require('../exception/exception');

// {
//     "ROW_NUM": 1,
//     "LARGE": "24",
//     "MID": "03",
//     "SMALL": "HR",
//     "LARGENAME": "숙근류",
//     "MIDNAME": "국화(스프레이)",
//     "GOODNAME": "팟베",
//     "GUBN": "Y"
// },

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
        if (!response) {
            response.push({
                code: data.LARGE,
                name: data.LARGENAME,
                mid: [
                    {
                        code: data.MID,
                        name: data.MIDNAME,
                        small: [
                            {
                                code: data.SMALL,
                                name: data.GOODNAME,
                            },
                        ],
                    },
                ],
            });
        }
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
