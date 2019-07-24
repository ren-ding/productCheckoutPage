import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutPage from './components/CheckoutPage';
import * as api from './api/api'
import * as serviceWorker from './serviceWorker';

const fetchDataForCheckoutPage = (setProducts, setPromotionCodes) => {
    api.fetchProducts().then(
        response => {
            setProducts(response);
        }
    );

    api.fetchPromotionCodes().then(
        response => {
            setPromotionCodes(response);
        }
    );
}

ReactDOM.render(<CheckoutPage fetchDataForCheckoutPage = {fetchDataForCheckoutPage}/>, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
