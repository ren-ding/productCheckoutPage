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
}

CheckoutPage.propTypes = {
    fetchDataForCheckoutPage: PropTypes.func.isRequired,
    submitPromotionCode: PropTypes.func.isRequired
};