import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProductsPanel extends Component {
    render() {
        return (
            <div>ProductsPanel</div>
        );
    }
}

ProductsPanel.propTypes = {
    products: PropTypes.array.isRequired
};