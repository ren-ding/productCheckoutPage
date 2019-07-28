import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckoutProdctSegment from '../CheckoutProductSegment';

export default class CheckoutPanel extends Component {
    render() {
        return (
            <div className='checkout-panel-wrapper'>
                <h2>CheckoutPanel</h2>
                {this.props.checkoutProducts.map(this.renderCheckoutProductComponent)}
            </div>
        );
    }

    renderCheckoutProductComponent = (product, index) => (
        <CheckoutProdctSegment
            key={index}
            product={product}
            removeFromCheckout={this.props.removeFromCheckout}
        />
    );
}

CheckoutPanel.propTypes = {
    checkoutProducts: PropTypes.array.isRequired,
    removeFromCheckout: PropTypes.func.isRequired
};