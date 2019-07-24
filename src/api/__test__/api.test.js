import * as fromApi from '../api';

describe('api', () => {
    describe('send request to fetch products', () => {
        it('should return a list of products', () => {

            fromApi.fetchProducts().then(
                response => {
                    expect(response.length).toEqual(fromApi.fakeDatabase.products.length);
                    response.forEach(p => expect(fromApi.fakeDatabase.products.includes(p)).toBe(true));
                }
            );
        });
    });

    describe('send request to fetch promotion codes', () => {
        it('should return a list of promotion codes', () => {

            fromApi.fetchPromotionCodes().then(
                response => {
                    expect(response.length).toEqual(fromApi.fakeDatabase.promotionCodes.length);
                    response.forEach(c => expect(fromApi.fakeDatabase.promotionCodes.includes(c)).toBe(true));
                }
            );
        });
    });
});