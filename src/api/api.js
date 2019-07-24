import {v4} from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

export const fakeDatabase = {
    products:[{
        uid: v4(),
        productId: 'wf',
        productName:'Workflow',
        price:199.99
    },{
        uid: v4(),
        productId: 'docgen',
        productName:'Document Generation',
        price:9.99
    },{
        uid: v4(),
        productId: 'form',
        productName:'Form',
        price:99.99
    }],
    promotionCodes:[{
        uid: v4(),
        code: 'RRD4D32',
        description:'10% discount for orders above $1000 (pre-discount)',
    },{
        uid: v4(),
        code: '44F4T11',
        description:'15% discount for orders above $1500 (pre-discount)',
    },{
        uid: v4(),
        code: 'FF9543D1',
        description:'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased',
    },{
        uid: v4(),
        code: 'YYGWKJD',
        description:'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
    }]
};

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = () =>
    delay(500).then(()=>fakeDatabase.products);

export const fetchPromotionCodes = () =>
    delay(500).then(()=>fakeDatabase.promotionCodes);    