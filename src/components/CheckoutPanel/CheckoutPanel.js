import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckoutProdctSegment from '../CheckoutProductSegment';
import CheckoutSummarySegment from '../CheckoutSummarySegment';

export default class CheckoutPanel extends Component {
    render() {
        return (
            <div className='checkout-panel-wrapper'>
                <div className="ui card">
                    <div className="content">
                        <div className="header">Checkout</div>
                    </div>
                    <div className="content">
                        <table className="ui very basic table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                                {this.props.checkoutProducts.map(this.renderCheckoutProductComponent)}     
                            </tbody>
                    </table>
                        
                    </div>
                    <div className="extra content">
                        {this.renderCheckoutSummaryComponent()}
                    </div>
                </div>
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