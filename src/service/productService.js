import {fakeDatabase} from '../db/fakedatabase'
import {delay} from './util';

export const fetchProducts = () =>
    delay(100).then(()=>fakeDatabase.products);

export const getProductPriceById = (productId) => {
    const product = fakeDatabase.products.find(p=> p.productId === productId);
    return product && product.price;
}

