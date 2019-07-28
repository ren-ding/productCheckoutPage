import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductSegment from '../ProductSegment';
import './style/ProductListPanel.css';

export default class ProductListPanel extends Component {
    render() {
        return (
            <div className='productlist-wrapper'>
                <table className="ui stripped table">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.props.products.map(this.renderProductComponent)}
                        </tbody>
                </table>
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