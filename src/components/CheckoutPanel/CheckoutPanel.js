import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckoutProdctSegment from '../CheckoutProductSegment';
import CheckoutSummarySegment from '../CheckoutSummarySegment';

export default class CheckoutPanel extends Component {
    render() {
        return (
            <div className='checkout-panel-wrapper'>
                <h2>CheckoutPanel</h2>
                {this.props.checkoutProducts.map(this.renderCheckoutProductComponent)}
                {this.renderCheckoutSummaryComponent()}
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

    renderCheckoutSummaryComponent = () => (
        <CheckoutSummarySegment
            code = {this.props.code}
            total = {this.props.total}
        />
    );
}

CheckoutPanel.propTypes = {
    checkoutProducts: PropTypes.array.isRequired,
    removeFromCheckout: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
};