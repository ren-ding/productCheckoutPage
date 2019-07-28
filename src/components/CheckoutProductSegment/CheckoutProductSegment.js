import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CheckoutProductSegment extends Component {
    render() {
        return (
            <div>
                <span>Id: {this.props.product.productId}  </span>
                <span>quantity: {this.props.product.quantity}  </span>
                <button className='remove-product-from-checkout' onClick={()=> this.props.removeFromCheckout(this.props.product.productId)}>x</button>
            </div>
        );
    }
}

CheckoutProductSegment.propTypes = {
    product: PropTypes.object.isRequired,
    removeFromCheckout: PropTypes.func.isRequired
};