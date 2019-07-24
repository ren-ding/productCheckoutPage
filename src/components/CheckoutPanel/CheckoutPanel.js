import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CheckoutPanel extends Component {
    render() {
        return (
            <div>CheckoutPanel</div>
        );
    }
}

CheckoutPanel.propTypes = {
    checkoutProducts: PropTypes.array.isRequired
};