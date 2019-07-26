import * as productService from '../productService';

describe('productService', () => {
    let mockDb;
    beforeEach(()=> {
        mockDb = {
            products:[{
                productId: 'wf',
                productName:'Workflow',
                price:199.99
            },{
                productId: 'docgen',
                productName:'Document Generation',
                price:9.99
            },{
                productId: 'form',
                productName:'Form',
                price:99.99
            }]
        }

        jest.mock('../../db/fakedatabase', ()=> mockDb);
    })

    describe('send request to fetch products', () => {
        it('should return a list of products', () => {
            productService.fetchProducts().then(
                response => {
                    expect(response.length).toEqual(mockDb.products.length);
                    response.forEach(p => expect(mockDb.products.includes(p)).toBe(true));
                }
            );
        });
    });

    describe('get product price by an existing id', () => {
        it('should get the product price', () => {
            
            const price = productService.getProductPriceById('wf');
            expect(price).toBe(199.99);
        });
    });

    describe('get product price by a not existing id', () => {
        it('should get the product price', () => {
            const price = productService.getProductPriceById('unknow');
            expect(price).toBeUndefined();
        });
    });
});