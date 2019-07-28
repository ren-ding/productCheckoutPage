import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CheckoutSummarySegment extends Component {
    render() {
        return (
            <div className='checkout-summary-wrapper'>
                {this.renderPromotionCode()}
                <div>Total Price: {this.props.total.toFixed(2)}  </div>
            </div>
        );
    }

    renderPromotionCode = () => {
        if(this.props.code)
            return (
                <div>Promotion Code: {this.props.code}  </div>
            )
    }
}

CheckoutSummarySegment.propTypes = {
    code: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
};