import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutPage from './components/CheckoutPage';
import * as productService from './service/productService';
import * as serviceWorker from './serviceWorker';

const fetchDataForCheckoutPage = (setProducts) => {
    productService.fetchProducts().then(
        response => {
            setProducts(response);
        }
    );
}

ReactDOM.render(<CheckoutPage fetchDataForCheckoutPage = {fetchDataForCheckoutPage}/>, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
