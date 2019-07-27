import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PromotionCodePanel from '../PromotionCodePanel';

export default class ProductsPanel extends Component {
    render() {
        return (
            <div>
                <h2>ProductsPanel</h2>
                <PromotionCodePanel
                    submitPromotionCode = {this.props.submitPromotionCode}
                    codeMessage = {this.props.codeMessage}
                />
            </div>
        );
    }
}

ProductsPanel.propTypes = {
    products: PropTypes.array.isRequired,
    submitPromotionCode: PropTypes.func.isRequired,
    codeMessage: PropTypes.string.isRequired
};