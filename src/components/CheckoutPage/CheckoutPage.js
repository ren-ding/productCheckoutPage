import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PromotionCodePanel from '../PromotionCodePanel';
import ProductListPanel from '../ProductListPanel';
import CheckoutPanel from '../CheckoutPanel';

export default class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            promotionCode: "",
            codeMessage: "",
            checkoutProducts: []
        }
    }

    componentDidMount() {
        this.props.fetchDataForCheckoutPage(this.setProducts);
    }

    render() {
        return (
            <div>
                <h1>Checkout page</h1>
                <PromotionCodePanel
                    submitPromotionCode = {this.submitPromotionCode}
                    codeMessage = {this.state.codeMessage}
                />
                <ProductListPanel 
                    products = {this.state.products}
                    addToCheckout= {this.addToCheckout}
                />
                <CheckoutPanel 
                    checkoutProducts = {this.state.checkoutProducts}
                />
            </div>
        );
    }

    setProducts = (products) => {
        this.setState({products})
    };

    submitPromotionCode = (code) => {
        this.props.submitPromotionCode(code, this.onSuccessPromotionCode, this.onFailPromotionCode);
    }

    onSuccessPromotionCode = (codeInfo) => {
        this.setState({promotionCode: codeInfo.code, codeMessage:codeInfo.description});
    }

    onFailPromotionCode = () => {
        this.setState({codeMessage: "Invalid promotion code"});
    }

    addToCheckout = (productId) => {
        const index = this.state.checkoutProducts.findIndex(p=> p.productId === productId);
        if(index === -1) {
            //this product does not exist in the checkoutlist, add a new one
            this.setState({
                checkoutProducts: [...this.state.checkoutProducts, {productId: productId, quantity:1}]
            });
            return;
        }

        //this product exist in the checkoutlist, increase quantity
        const quantity = this.state.checkoutProducts[index].quantity;
        this.setState({
            checkoutProducts: [...this.state.checkoutProducts.slice(0,index),
                               {...this.state.checkoutProducts[index], quantity: quantity+1},
                               ...this.state.checkoutProducts.slice(index+1)]
        });
    }
}

CheckoutPage.propTypes = {
    fetchDataForCheckoutPage: PropTypes.func.isRequired,
    submitPromotionCode: PropTypes.func.isRequired
};