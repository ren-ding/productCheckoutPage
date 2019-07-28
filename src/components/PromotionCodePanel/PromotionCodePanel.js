import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PromotionCodePanel extends Component {
    render() {
        let input;
        return (
            <div className='ui action labeled input'>
                <div className="ui label">
                    Promotion Code:
                </div>
                <input type="text" ref = { node => {
                    input = node;
                }}
                />
                <button className='ui teal button code-submit' onClick={() => this.props.submitPromotionCode(input.value)}>Submit Code</button>
                {this.renderCodeMessage()}
            </div>
        );
    }

    renderCodeMessage = () => {
        if (this.props.codeMessage) {
            return (
                <div className='ui purple tag label'>
                    {this.props.codeMessage}
                </div>
            );
        }
    }
}

PromotionCodePanel.propTypes = {
    submitPromotionCode: PropTypes.func.isRequired,
    codeMessage: PropTypes.string.isRequired
};