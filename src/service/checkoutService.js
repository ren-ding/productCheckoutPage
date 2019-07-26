import * as promotionCodeServie from './promotionCodeService';
import * as productService from './productService';

export const calculateTotal = (checkoutProducts, promotionCode) => {
    const validCode = promotionCodeServie.getPromotionCodeByCode(promotionCode);
    if(validCode) {
        const promotionData = promotionCodeServie.getPromotionDataByCode(promotionCode);
        if(promotionData.minPurchase && promotionData.discountRate){
            return totalWithMinPurchaseAmountDiscount(checkoutProducts, promotionData.minPurchase, promotionData.discountRate);
        }
        else if (promotionData.minPurchasedProductId
              &&promotionData.minPurchasedProductQuantity
              &&promotionData.discountProductId
              &&promotionData.discountProductPrice) {
            return totalWithMinPurchaseProductDiscount(checkoutProducts,
                                                       promotionData.minPurchasedProductId,
                                                       promotionData.minPurchasedProductQuantity,
                                                       promotionData.discountProductId,
                                                       promotionData.discountProductPrice);
        }             
    } else {
        return totalWithoutPromotionCode(checkoutProducts);
    }    
}

const sumupReducer = (total, checkoutProduct) => 
    total + productService.getProductPriceById(checkoutProduct.productId) * checkoutProduct.quantity;

const totalWithoutPromotionCode = (checkoutProducts) => checkoutProducts.reduce(sumupReducer,0);

const totalWithMinPurchaseAmountDiscount = (checkoutProducts, minPurchase, discount) => {
    const total = checkoutProducts.reduce(sumupReducer,0);
    return total > minPurchase ? round(total* discount, 2): total;
}

const totalWithMinPurchaseProductDiscount = (checkoutProducts,
                                             minPurchasedProductId,
                                             minPurchasedProductQuantity,
                                             discountProductId,
                                             discountProductPrice) => {
    const hasDiscount = checkoutProducts.some(cp=> cp.productId === minPurchasedProductId 
                                              && cp.quantity >= minPurchasedProductQuantity);
    const totalWithoutDiscount = checkoutProducts.reduce(sumupReducer,0);
    const discountProduct = checkoutProducts.find(cp=> cp.productId === discountProductId);
    if(!hasDiscount || !discountProduct) return totalWithoutDiscount;

    const discountAmount = (productService.getProductPriceById(discountProduct.productId) - discountProductPrice) * discountProduct.quantity;
    return round(totalWithoutDiscount - discountAmount, 2);
}

const round = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);

