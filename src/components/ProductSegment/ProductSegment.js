import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProductSegment extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.product.productId}</td>
                <td>{this.props.product.productName}</td>
                <td>{this.props.product.price}</td>
                <td>
                    <div className="add-product-to-checkout ui primary button"
                        onClick={()=> this.props.addToCheckout(this.props.product.productId)}
                    >
                        <i className="shop icon"></i> Add to Cart
                    </div>
                </td>
            </tr>
        );
    }
}

ProductSegment.propTypes = {
    product: PropTypes.object.isRequired,
    addToCheckout: PropTypes.func.isRequired
};