import React from 'react';
import CheckoutPage from '../CheckoutPage';
import renderer from 'react-test-renderer';

describe('CheckoutPage',()=> {
    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutPage/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });
});