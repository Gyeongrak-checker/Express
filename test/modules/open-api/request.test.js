const openApi = require('@/modules/open-api/request');


test('도매시장 코드 조회', async () => {
    const result = await openApi.getMarketCode();
    expect(result.data[`${openApi.serviceCode.market}`].result.code).toEqual('INFO-000');
});

test('법인 코드 조회', () => {});

test('품목 코드 조회', () => {});

test('경락 정보 조회', () => {});

