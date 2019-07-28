import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductSegment from '../ProductSegment';

export default class ProductListPanel extends Component {
    render() {
        return (
            <div className='productlist-wrapper'>
                <h2>ProductListPanel</h2>
                {this.props.products.map(this.renderProductComponent)}
            </div>
        );
    }

    renderProductComponent = (product, index) => (
        <ProductSegment
            key={index}
            product={product}
            addToCheckout={this.props.addToCheckout}
        />
    );
}

ProductListPanel.propTypes = {
    products: PropTypes.array.isRequired,
    addToCheckout: PropTypes.func.isRequired
};