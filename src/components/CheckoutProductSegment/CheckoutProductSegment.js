import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CheckoutProductSegment extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.product.productId}</td>
                <td>{this.props.product.quantity}</td>
                <td>
                    <div className="remove-product-from-checkout ui button"
                        onClick={()=> this.props.removeFromCheckout(this.props.product.productId)}
                    >
                        <i className="close icon"></i>
                    </div>
                </td>
            </tr>
        );
    }
}

CheckoutProductSegment.propTypes = {
    product: PropTypes.object.isRequired,
    removeFromCheckout: PropTypes.func.isRequired
};