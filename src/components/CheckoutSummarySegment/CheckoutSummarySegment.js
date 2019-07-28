import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CheckoutSummarySegment extends Component {
    render() {
        return (
            <div className='checkout-summary-wrapper'>
                <span>Promotion Code: {this.props.code}  </span>
                <span>Total Price: {this.props.total.toFixed(2)}  </span>
            </div>
        );
    }
}

CheckoutSummarySegment.propTypes = {
    code: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
};