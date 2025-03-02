const openApi = require('@/modules/open-api/request');


test('도매시장 코드 조회', async () => {
    const result = await openApi.getMarketCode(0, 0);

    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty(openApi.serviceCode.market);
    expect(result.data[openApi.serviceCode.market]).toHaveProperty('result.code', 'INFO-000');

    expect(result.data[openApi.serviceCode.market]).toHaveProperty('result.code', 'INFO-000').toMatchSnapshot();
});

test('법인 코드 조회', async () => {});

test('품목 코드 조회', async  () => {});

test('경락 정보 조회', async  () => {});