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
            checkoutProducts: [],
            total: 0
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
                    removeFromCheckout = {this.removeFromCheckout}
                    code = {this.state.promotionCode}
                    total = {this.state.total}
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
        this.setState({promotionCode: codeInfo.code, codeMessage:codeInfo.description},
            ()=> {
                this.setState({total: this.calculateTotal()});
            });
    }

    onFailPromotionCode = () => {
        this.setState({codeMessage: "Invalid promotion code"});
    }

    addToCheckout = (productId) => {
        const index = this.state.checkoutProducts.findIndex(p=> p.productId === productId);
        if(index === -1) {
            //this product does not exist in the checkoutlist, add a new one
            this.setState({
                checkoutProducts: [...this.state.checkoutProducts, {productId: productId, quantity:1}],
            }, () => {
                this.setState({total: this.calculateTotal()});
            });
            return;
        }

        //this product exist in the checkoutlist, increase quantity
        const quantity = this.state.checkoutProducts[index].quantity;
        this.setState({
            checkoutProducts: [...this.state.checkoutProducts.slice(0,index),
                               {...this.state.checkoutProducts[index], quantity: quantity+1},
                               ...this.state.checkoutProducts.slice(index+1)]
        }, ()=> {
            this.setState({total: this.calculateTotal()});
        });
    }

    removeFromCheckout = (productId) => {
        const index = this.state.checkoutProducts.findIndex(p=> p.productId === productId);
        if(index === -1) return;
        
        this.setState({
            checkoutProducts: [...this.state.checkoutProducts.slice(0,index),
                                ...this.state.checkoutProducts.slice(index+1)]
        }, () => {
            this.setState({total: this.calculateTotal()});
        });
    }

    calculateTotal = () => 
        this.props.calculateTotal(this.state.checkoutProducts, this.state.promotionCode);
}

CheckoutPage.propTypes = {
    fetchDataForCheckoutPage: PropTypes.func.isRequired,
    submitPromotionCode: PropTypes.func.isRequired,
    calculateTotal: PropTypes.func.isRequired
};