import * as promotionCodeService from '../promotionCodeService';

describe('promotionCodeService', () => {
    let mockDb;
    beforeEach(()=>{
        mockDb = {
            promotionCodes:[{
                code: 'RRD4D32',
                description:'10% discount for orders above $1000 (pre-discount)',
            }],
            promotionData:[{
                code: 'RRD4D32',
                minPurchase: 1000,
                discountRate: 0.9,
            },{
                code: 'FF9543D1',
                minPurchasedProductId: 'docgen',
                minPurchasedProductQuantity: 10,
                discountProductId: 'docgen',
                discountProductPrice: 8.99
            }]
        }
        jest.mock('../../db/fakedatabase', ()=> mockDb);
    });

    describe('get a promotion code by given a valid code', () => {
        it('should get the promotion code and description information', () => {
            const promotionCode = promotionCodeService.getPromotionCodeByCode('RRD4D32');
            expect(promotionCode.code).toEqual('RRD4D32');
            expect(promotionCode.description).toEqual('10% discount for orders above $1000 (pre-discount)');
        });
    });

    describe('get a promotion code by given a invalid code', () => {
        it('should return undefined', () => {
            const promotionCode = promotionCodeService.getPromotionCodeByCode('AAAAAAA');
            expect(promotionCode).toBeUndefined();
        });
    });

    describe('get promotion data by given a valid code', () => {
        it('should get the promotion data for calculation', () => {
            const promotionData = promotionCodeService.getPromotionDataByCode('RRD4D32');
            expect(promotionData.minPurchase).toEqual(1000);
            expect(promotionData.discountRate).toEqual(0.9);
            expect(promotionData.minPurchasedProductId).toBeUndefined();
            expect(promotionData.minPurchasedProductQuantity).toBeUndefined();
            expect(promotionData.discountProductId).toBeUndefined();
            expect(promotionData.discountProductPrice).toBeUndefined();
        });
    });

    describe('get promotion data by given a invalid code', () => {
        it('should return undefined', () => {
            const promotionData = promotionCodeService.getPromotionDataByCode('AAAAAAA');
            expect(promotionData).toBeUndefined();
        });
    });

});