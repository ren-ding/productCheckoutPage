import React from 'react';
import CheckoutSummarySegment from '../CheckoutSummarySegment';
import renderer from 'react-test-renderer';

describe('CheckoutSummarySegment', ()=> {
    let props;

    beforeEach(()=> {
        props = {
            code: 'YYGWKJD',
            total: 200
        }   
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutSummarySegment {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });

    
});