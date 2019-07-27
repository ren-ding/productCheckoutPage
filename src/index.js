import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutPage from './components/CheckoutPage';
import * as productService from './service/productService';
import * as promotionCodeService from './service/promotionCodeService';
import * as serviceWorker from './serviceWorker';

const fetchDataForCheckoutPage = (setProducts) => {
    productService.fetchProducts().then(
        response => {
            setProducts(response);
        }
    );
}

const submitPromotionCode = (code, onSuccess, onFail) => {
    const codeInfo = promotionCodeService.getPromotionCodeByCode(code);
    if(codeInfo) onSuccess(codeInfo);
    else onFail();
}

ReactDOM.render(<CheckoutPage 
                    fetchDataForCheckoutPage = {fetchDataForCheckoutPage}
                    submitPromotionCode = {submitPromotionCode}
                />,
document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
