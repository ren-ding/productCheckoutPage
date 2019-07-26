import * as checkoutService from '../checkoutService';
import * as productService from '../productService';
import * as promotionCodeService from '../promotionCodeService';

describe('checkoutService', () => {
    let checkoutProductList;

    beforeEach(()=> {
        //mockup price list with product id
        productService.getProductPriceById = jest.fn((productId)=> {
            switch(productId) {
                case 'wf': return 199.99;
                case 'docgen': return 9.99;
                case 'form': return 99.99;
                default: return 0;
            }     
        });

        promotionCodeService.getPromotionCodeByCode = jest.fn((promotionCode)=> {
            switch(promotionCode) {
                case 'RRD4D32': return {code: 'RRD4D32', description: ''};
                case '44F4T11': return {code: '44F4T11', description: ''};
                case 'FF9543D1': return {code: 'FF9543D1', description: ''};
                case 'YYGWKJD': return {code: 'YYGWKJD', description: ''};
                default: return null;
            }     
        });

        promotionCodeService.getPromotionDataByCode = jest.fn((promotionCode)=> {
            switch(promotionCode) {
                case 'RRD4D32': 
                    return {
                        code: 'RRD4D32',
                        minPurchase: 1000,
                        discountRate: 0.9,
                    };
                case '44F4T11': 
                    return {
                        code: '44F4T11',
                        minPurchase: 1500,
                        discountRate: 0.85,
                    };
                case 'FF9543D1': 
                    return {
                        code: 'FF9543D1',
                        minPurchasedProductId: 'docgen',
                        minPurchasedProductQuantity: 10,
                        discountProductId: 'docgen',
                        discountProductPrice: 8.99
                    };
                case 'YYGWKJD': 
                    return {
                        code: 'YYGWKJD',
                        minPurchasedProductId: 'wf',
                        minPurchasedProductQuantity: 1,
                        discountProductId: 'form',
                        discountProductPrice: 89.99
                    };
                default: return null;
            }     
        });
        

    });

    describe('calculate checkout products total amount without promotion code', () => {
        it('should sum up the price', () => {
            checkoutProductList = [{
                productId:'wf',
                quantity: 2
            }];

            const total = checkoutService.calculateTotal(checkoutProductList,'');
            expect(total).toBe(399.98);
        });
    });

    describe('calculate checkout products total amount with a promotion code of min purcahse amount discount rule', () => {
        it('should sum up the price with discount', () => {
            checkoutProductList = [{
                productId:'wf',
                quantity: 6
            }];
            
            const total = checkoutService.calculateTotal(checkoutProductList,'RRD4D32');
            expect(total).toBe(1079.95);
        });
    });


    describe('calculate checkout products total amount with a promotion code of min purcahse product discount rule', () => {
        it('should sum up the price with product unit discount', () => {
            checkoutProductList = [{
                productId:'wf',
                quantity: 1
            },{
                productId:'form',
                quantity: 1
            }];
            
            const total = checkoutService.calculateTotal(checkoutProductList,'YYGWKJD');
            expect(total).toBe(289.98);
        });
    });
});