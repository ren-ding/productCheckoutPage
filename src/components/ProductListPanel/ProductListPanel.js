import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProductListPanel extends Component {
    render() {
        return (
            <div>
                <h2>ProductListPanel</h2>
            </div>
        );
    }
}

ProductListPanel.propTypes = {
    products: PropTypes.array.isRequired,
};