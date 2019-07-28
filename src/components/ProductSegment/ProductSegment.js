import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProductSegment extends Component {
    render() {
        return (
            <div>
                <span>Id: {this.props.product.productId}  </span>
                <span>Name: {this.props.product.productName}  </span>
                <span>Price: {this.props.product.price}  </span>
                <button className='add-product-to-checkout' onClick={()=> this.props.addToCheckout(this.props.product.productId)}>+</button>
            </div>
        );
    }
}

ProductSegment.propTypes = {
    product: PropTypes.object.isRequired,
    addToCheckout: PropTypes.func.isRequired
};