// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

export const fakeDatabase = {
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
    }],
    promotionCodes:[{
        code: 'RRD4D32',
        description:'10% discount for orders above $1000 (pre-discount)',
    },{
        code: '44F4T11',
        description:'15% discount for orders above $1500 (pre-discount)',
    },{
        code: 'FF9543D1',
        description:'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased',
    },{
        code: 'YYGWKJD',
        description:'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
    }],
    promotionData:[{
        code: 'RRD4D32',
        minPurchase: 1000,
        discountRate: 0.9,
    },{
        code: '44F4T11',
        minPurchase: 1500,
        discountRate: 0.85,
    },{
        code: 'FF9543D1',
        minPurchasedProductId: 'docgen',
        minPurchasedProductQuantity: 10,
        discountProductId: 'docgen',
        discountProductPrice: 8.99
    },{
        code: 'YYGWKJD',
        minPurchasedProductId: 'wf',
        minPurchasedProductQuantity: 1,
        discountProductId: 'form',
        discountProductPrice: 89.99
    }]
};
  