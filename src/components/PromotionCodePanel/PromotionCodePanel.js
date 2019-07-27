import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PromotionCodePanel extends Component {
    render() {
        let input;
        return (
            <div className='promotion-code-panel-wrapper'>
                <span>Promotion Code:</span>
                <input ref = { node => {
                    input = node;
                }}
                />
                <button className='code-submit' onClick={() => this.props.submitPromotionCode(input.value)}>Submit Code</button>
                <span>{this.props.codeMessage}</span>
            </div>
        );
    }
}

PromotionCodePanel.propTypes = {
    submitPromotionCode: PropTypes.func.isRequired,
    codeMessage: PropTypes.string.isRequired
};