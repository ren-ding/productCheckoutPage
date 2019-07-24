import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            promotionCodes: [],
            inputPromotionCode: "",
            checkoutProducts: []
        }
    }

    componentDidMount() {
        this.props.fetchDataForCheckoutPage(this.setProducts, this.setPromotionCodes);
    }

    render() {
        return (
            <div>Checkout page</div>
        );
    }

    setProducts = (products) => {
        this.setState({products})
    };

    setPromotionCodes = (promotionCodes) => {
        this.setState({promotionCodes})
    }
}

CheckoutPage.propTypes = {
    fetchDataForCheckoutPage: PropTypes.func.isRequired
};