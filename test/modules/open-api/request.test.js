const openApi = require('@/modules/open-api/request');


test('도매시장 코드 조회', async () => {
    const result = await openApi.getMarketCode(0, 0)
        .catch((e) => console.log(e));
});

test('법인 코드 조회', async () => {});

test('품목 코드 조회', async  () => {});

test('경락 정보 조회', async  () => {});